// Types
import {
  AskParams,
  DataChunkAnswer,
  DefaultClassParams,
  GPTModelName,
  OpenAIChatCompletionResponse,
  SupabaseDataChunk,
  SupabaseDataChunkWithQuestion,
} from '@types';
// Utils
import { BaseClass } from '@utils/BaseClass';
import { OpenAIChatCompletion } from './OpenAIChatCompletion';
import { getStringFromObject } from '@utils/getStringFromObject';
import { getTokens } from '@utils/getTokens';
import { getTokensLimit } from '@utils/getTokensLimit';
import { DataChunks } from './DataChunks';

type AssignQuestionToolTypes = {
  assignQuestionToDataChunks: {
    data_chunk_id: string;
    question: string;
  };
};

/**
 * Assigns questions to data chunks based on their summaries.
 */
export class QuestionAssigner extends BaseClass {
  private model: GPTModelName = GPTModelName.GPT316k;
  private _dataChunks?: DataChunks;
  private tokensLimit = getTokensLimit(this.model);
  private totalCosts = 0;
  private totalUsage = 0;

  constructor(params: DefaultClassParams) {
    super(params);
  }

  // Lazy initializer for DataChunks
  private get dataChunks(): DataChunks {
    if (!this._dataChunks) {
      this._dataChunks = new DataChunks({ verbose: this.verbose });
    }
    return this._dataChunks;
  }

  /**
   * Calculate the remaining tokens available after accounting for tool and message tokens.
   * @returns The number of tokens remaining.
   */
  readonly getTokensLimit = async (): Promise<number> => {
    const openAIData = await this.getOpenAIConfig('', []);
    const stringedTools = JSON.stringify(openAIData.tools);
    const avgToolsTokens = await getTokens(stringedTools);
    const tokensLimit =
      this.tokensLimit - (openAIData.messagesTokens + avgToolsTokens);

    return tokensLimit;
  };

  /**
   * Prepares the message and tools to be used for asking OpenAI to assign questions.
   * @param question The question to be assigned.
   * @param dataChunks The data chunks available for assignment.
   * @returns The config to send to OpenAI.
   */
  readonly getOpenAIConfig = async (
    question: string,
    dataChunks: SupabaseDataChunk[],
  ): Promise<{
    messages: OpenAIChatCompletion['messages'];
    messagesTokens: number;
    tools: OpenAIChatCompletion['tools'];
  }> => {
    const role = `Role: Expert question assigner.`;
    const instructions = `Instructions: Assign user questions to the relevant DataChunk based on its summary. If no DataChunk matches, return an empty array. Assign judiciously to manage costs and usage.`;

    const dataChunksInfo = dataChunks
      .map((d) => ({
        data_chunk_id: d.id,
        summary: d.summary,
      }))
      .map((d) => getStringFromObject(d))
      .join('\n\n\n');
    const dataChunksMessage = `DataChunks info:\n\n${
      dataChunksInfo.length ? dataChunksInfo : 'No DataChunks'
    }`;

    const tools: OpenAIChatCompletion['tools'] = [
      {
        type: 'function',
        function: {
          name: 'assignQuestionToDataChunks',
          description:
            'Assign question to the corresponding DataChunks only if the question matches the DataChunk summary.',
          parameters: {
            type: 'object',
            properties: {
              data_chunk_id: {
                type: 'string',
              },
              question: {
                type: 'string',
              },
            },
            required: ['data_chunk_id', 'question'],
          },
        },
      },
    ];

    const messages: OpenAIChatCompletion['messages'] = [
      {
        role: 'system',
        content: `${role}\n${instructions}\n\n${dataChunksMessage}`,
      },
      {
        role: 'user',
        content: `This is the user question: "${question}"`,
      },
    ];

    const messagesTokens = await getTokens(
      messages.map((m) => m.content).join(''),
    );

    if (messagesTokens > this.tokensLimit) {
      throw new Error(
        `The question assigner model can only handle ${this.tokensLimit} tokens, but the messages have ${messagesTokens} tokens`,
      );
    }

    return {
      messages,
      messagesTokens,
      tools,
    };
  };

  /**
   * Assigns questions to data chunks based on the responses from OpenAI tool calls.
   * @param params The parameters for assigning the questions to the data chunks.
   * @param params.toolCalls The tool calls from the OpenAI response.
   * @param params.dataChunks The data chunks to assign the questions to.
   * @returns The data chunks with assigned questions.
   */
  readonly getDataChunksWithQuestions = (params: {
    toolCalls: OpenAIChatCompletionResponse<AssignQuestionToolTypes>['data']['tool_calls'];
    dataChunks: SupabaseDataChunk[];
  }): SupabaseDataChunkWithQuestion[] => {
    const { toolCalls, dataChunks } = params;
    try {
      const dataChunksWithQuestions: SupabaseDataChunkWithQuestion[] = [];

      if (toolCalls) {
        for (const toolCall of toolCalls) {
          const funcName = toolCall.function.name;
          if (funcName === 'assignQuestionToDataChunks') {
            const { data_chunk_id, question } = toolCall.function.arguments;
            const dataChunk = dataChunks.find((d) => d.id === data_chunk_id);

            if (!dataChunk) {
              throw new Error(`DataChunk with id '${data_chunk_id}' not found`);
            }

            dataChunksWithQuestions.push({
              ...dataChunk,
              question,
            });
          }
        }
      }

      return dataChunksWithQuestions;
    } catch (error: any) {
      this.log('getAssignedDataChunks - Error', error.message || error, true);
      throw new Error(error.message || error);
    }
  };

  /**
   * Processes the given question and returns the answers after assigning it to the relevant data chunks.
   * @param params The parameters for asking the question.
   * @param params.question The question to ask.
   * @param params.ai_table_name The AI table name to use for getting the data chunks.
   * @returns The answers and usage metrics.
   */
  readonly getDataChunkAnswers = async (
    params: AskParams,
  ): Promise<{
    cost: number;
    usage: number;
    data: DataChunkAnswer[];
  }> => {
    const { question, ai_table_name } = params;
    try {
      // 1. Get the data chunks based on the ai_table_name
      this.log(
        'ask',
        `Getting data chunks based on the ai_table_name '${ai_table_name}'...`,
      );
      const { data, error } = await this.dataChunks.get({
        ai_table_name,
      });

      if (error) {
        throw new Error(error);
      }

      if (!data || !data.length) {
        throw new Error(`No DataChunks found for '${ai_table_name}'`);
      }

      // 2. Get the OpenAI data
      const openAIData = await this.getOpenAIConfig(question, data);

      // 3. Create questions for the data chunks
      const openAIChatCompletion: OpenAIChatCompletionResponse<AssignQuestionToolTypes> =
        await new OpenAIChatCompletion({
          verbose: this.verbose,
          model: this.model,
          ...openAIData,
        }).call();

      this.totalCosts += openAIChatCompletion.costs.total;
      this.totalUsage += openAIChatCompletion.usageData.total;
      const toolCalls = openAIChatCompletion.data?.tool_calls;

      // 4. Get data chunks with question
      const dataChunksWithQuestions = this.getDataChunksWithQuestions({
        toolCalls,
        dataChunks: data,
      });

      // 5. Give the data chunks with question to the data chunks
      const dataChunkResponses = await this.dataChunks.respondQuestions({
        data: dataChunksWithQuestions,
      });

      this.totalCosts += dataChunkResponses.costs;
      this.totalUsage += dataChunkResponses.usage;

      this.log(
        'ask',
        `Total costs: ${this.totalCosts}\nTotal usage: ${this.totalUsage}`,
      );

      return {
        cost: this.totalCosts,
        usage: this.totalUsage,
        data: dataChunkResponses.data,
      };
    } catch (error: any) {
      this.log('ask - Error', error.message || error, true);
      throw new Error(error.message || error);
    }
  };
}
