import {
  AskParams,
  DefaultClassParams,
  GPTModelName,
  OpenAIChatCompletionResponse,
  SupabaseDataChunk,
  SupabaseDataChunkWithQuestion,
} from '@types';
import { BaseClass } from '@utils/BaseClass';
import { OpenAIChatCompletion } from './OpenAIChatCompletion';
import { getStringFromObject } from '@utils/getStringFromObject';
import { getTokens } from '@utils/getTokens';
import { getTokensLimit } from '@utils/getTokensLimit';
import { DataChunks } from './DataChunks';

type ToolsTypes = {
  assignQuestionToDataChunks: {
    data_chunk_id: string;
    question: string;
  };
};

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

  readonly getTokensLimit = async () => {
    const openAIData = await this.getOpenAIData('', []);
    const stringedTools = JSON.stringify(openAIData.tools);
    const avgToolsTokens = await getTokens(stringedTools);
    const tokensLimit =
      this.tokensLimit - (openAIData.messagesTokens + avgToolsTokens);

    return tokensLimit;
  };

  readonly getOpenAIData = async (
    question: string,
    dataChunks: SupabaseDataChunk[],
  ) => {
    const role = `Role: You are a DataChunk Question Assigner.`;
    const instructions = `Instructions: You are going to receive summaries of data from DataChunks. You are also going to receive a question from the user. Your goal is to assign the question to the correct DataChunk. If you don't find any DataChunk that matches the question, you have to return a concise message saying that you couldn't find any DataChunk that matches the question.`;
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

  readonly getDataChunksWithQuestions = (params: {
    toolCalls: OpenAIChatCompletionResponse<ToolsTypes>['data']['tool_calls'];
    dataChunks: SupabaseDataChunk[];
  }) => {
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

  readonly getDataChunkAnswers = async (params: AskParams) => {
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
      const openAIData = await this.getOpenAIData(question, data);

      // 3. Ask OpenAI
      const openAIChatCompletion: OpenAIChatCompletionResponse<ToolsTypes> =
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
