// Vendors
import { ChatCompletionMessageParam } from 'openai/resources';
import { OpenAIChatCompletion } from './OpenAIChatCompletion';
// Utils
import { Data } from './Data';
import { BaseClass } from '@utils/BaseClass';
import { getTokensLimit } from '@utils/getTokensLimit';
import { getTokens } from '@utils/getTokens';
// Types
import {
  AssignedDataChunk,
  DataChunkAnswer,
  DataChunkInsert,
  DefaultClassParams,
  DefaultGPTCompletionResponse,
  GPTModelName,
  OpenAIChatCompletionResponse,
  ProcessedDataChunk,
  SupabaseDBNames,
  SupabaseDataChunk,
  SupabaseDataChunkWithQuestion,
  SupabaseGetDataResponse,
} from '@types';

type DataChunkGetParams = {
  ai_table_name?: string | string[];
  avialableTokens?: number;
  tokensAscending?: boolean;
  data_chunk_ids?: string[];
};

type DataChunksCreateParams = {
  data: AssignedDataChunk;
};

export class DataChunks extends BaseClass {
  private supabaseDBName: SupabaseDBNames = 'ai_db_data_chunk';
  private summarizerModel: GPTModelName = GPTModelName.GPT316k;
  private questionResponderModel: GPTModelName = GPTModelName.GPT316k;
  private summarierTokensLimit = getTokensLimit(this.summarizerModel); // The tokens limit for the summarizer model
  private totalCost = 0;
  private totalUsage = 0;

  constructor(params: DefaultClassParams) {
    super(params);
  }

  readonly getTokensLimit = async () => {
    const summaryMessages = await this.getSummaryMessage('');
    const tokensLimit = this.summarierTokensLimit - summaryMessages.tokens;

    return tokensLimit;
  };

  private getSummaryMessage = async (data: string) => {
    // 1. Summarization Instructions
    const summarizationInstructions =
      'Instructions: Summarize the given data concisely, focusing on the key points and information. ' +
      'Ensure the summary is clear and informative, to assist a secondary GPT instance in understanding the data context.\n';

    // 2. Output Format
    const outputFormatInstructions =
      'Output Format: Provide the summary in a structured format, with a title and bullet points capturing the key information.\n';

    // Combining all parts to form the complete prompt
    const systemPrompt = summarizationInstructions + outputFormatInstructions;

    // 3. Create data message
    const dataMessage = `Summarize the following data:\n\n\`\`\`${data}\`\`\``;

    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'assistant',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: dataMessage,
      },
    ];

    const messagesTokens = await getTokens(
      messages.map((m) => m.content).join(''),
    );

    if (messagesTokens > this.summarierTokensLimit) {
      throw new Error(
        `The summarizer model can only handle ${this.summarierTokensLimit} tokens, but the messages have ${messagesTokens} tokens`,
      );
    }

    return {
      data: messages,
      tokens: messagesTokens,
    };
  };

  /**
   * @description Creates a summary of the given data
   * @param formatted_data The data to summarize
   * @returns The summary of the given data
   */
  public createSummary = async (formatted_data: string) => {
    try {
      if (!formatted_data.length) {
        throw new Error(`The data does not have a formatted_data`);
      }

      // 1. Get summary message
      const { data: messages, tokens: messagesTokens } =
        await this.getSummaryMessage(formatted_data);

      // 2. Create the summarization
      this.log(
        'createSummary',
        `Data tokens: ${messagesTokens}\n\nCreating data summarization...`,
      );

      const summary: OpenAIChatCompletionResponse<DefaultGPTCompletionResponse> =
        await new OpenAIChatCompletion({
          verbose: this.verbose,
          model: this.summarizerModel,
          messages,
        }).call();

      const response = {
        data: summary.data.content!,
        costs: summary.costs,
        usageData: summary.usageData,
      };

      this.totalCost += summary.costs.total;
      this.totalUsage += summary.usageData.total;

      this.log(
        `createSummary`,
        `Summary cost: ${summary.costs.total}\nSummary Usage: ${summary.usageData.total}`,
      );

      return response;
    } catch (error: any) {
      this.log('createSummary - Error', error.message || error, true);
      throw error;
    }
  };

  private createProccecedDataChunk = (
    assignedData: AssignedDataChunk,
    dataChunk: SupabaseDataChunk,
  ) => {
    const response: ProcessedDataChunk = {
      ...dataChunk,
      data: assignedData.data.map((d) => ({
        ...d,
        data_chunk: dataChunk.id,
      })),
    };

    return response;
  };

  public processAssignedDataChunks = async (params: {
    data: AssignedDataChunk[];
  }) => {
    const { data } = params;
    try {
      // 1. Filter existing and not existing data chunks
      const dataChunksUpdates = data.filter((d) => d.data_chunk_id);
      const newDataChunks = data.filter((d) => !d.data_chunk_id);

      // 2. Create new data chunks
      const newDataChunksPromises = newDataChunks.map(
        async (assignedDataChunk) => {
          const dataChunk = await this.create({
            data: assignedDataChunk,
          });

          return this.createProccecedDataChunk(assignedDataChunk, dataChunk);
        },
      );
      const newDataChunksResult = await Promise.all(newDataChunksPromises);

      this.sendMessage(`Created ${newDataChunksResult.length} data chunks`);

      // 3. Update existing data chunks
      const dataChunkUpdatesPromises = dataChunksUpdates.map(
        async (assignedDataChunk) => {
          const dataChunk = (await this.update({
            data: assignedDataChunk,
          })) as SupabaseDataChunk;

          return this.createProccecedDataChunk(assignedDataChunk, dataChunk);
        },
      );

      const dataChunkUpdatesResult = (
        await Promise.all(dataChunkUpdatesPromises)
      ).filter((d) => d);

      this.sendMessage(`Updated ${dataChunkUpdatesResult.length} data chunks`);
      this.log(
        `processAssignedDataChunks`,
        `Data chunks updates: ${dataChunkUpdatesResult.length}\nNew data chunks: ${newDataChunksResult.length}\nTotal Cost: ${this.totalCost}\nTotal Usage: ${this.totalUsage}`,
      );

      return {
        new: newDataChunksResult,
        updated: dataChunkUpdatesResult,
        cost: this.totalCost,
        usage: this.totalUsage,
      };
    } catch (error: any) {
      this.log(
        'processAssignedDataChunks - Error',
        error.message || error,
        true,
      );
      throw new Error(error.message || error);
    }
  };

  /**
   * @description Gets data chunks based on the parameters
   * @param ai_table_name The AI table name to get the data chunks from
   * @param avialableTokens The available tokens that the data chunk should have. If not provided, it will not be used
   * @param tokensAscending If true, the query will order the data by tokens ascending. If false, it will order by tokens descending, and if not provided, it will not be used
   * @returns The data chunks that match the parameters
   */
  public get = async (params: DataChunkGetParams = {}) => {
    const tokensLimit = await this.getTokensLimit();
    const { ai_table_name, tokensAscending, avialableTokens, data_chunk_ids } =
      params;
    const maxTokens = avialableTokens && tokensLimit - avialableTokens;

    try {
      const dataChunks: SupabaseGetDataResponse<SupabaseDataChunk> =
        await this.supabase.getData({
          ai_table_name,
          table_name: this.supabaseDBName,
          maxTokens,
          tokensAscending,
          ids: data_chunk_ids,
        });

      return dataChunks;
    } catch (error: any) {
      this.log('getAvailable - Error', error.message || error, true);
      throw error;
    }
  };

  public create = async (params: DataChunksCreateParams) => {
    const { data } = params;
    try {
      // 1. Check if the data chunk doesn't exist
      if (data.data_chunk_id) {
        throw new Error(`The data chunk already exists`);
      }

      // 2. Create a summary of the data
      const summaryData = await this.createSummary(data.formatted_data);

      this.log(
        'create',
        `Data tokens: ${data.tokens}\n\nData Summary tokens: ${summaryData.usageData.completion}`,
      );

      // 3. Create the data chunk in the database
      this.log('create', 'Creating data chunk in the database...');
      const dataChunk: DataChunkInsert = {
        formatted_data: data.formatted_data,
        ai_table_name: data.ai_table_name,
        summary: summaryData.data,
        tokens: data.tokens,
      };

      const { data: supabaseDataChunk, error } = await this.supabase.insertData(
        {
          data: [dataChunk],
          table_name: this.supabaseDBName,
        },
      );

      if (error) {
        throw error;
      }

      return (supabaseDataChunk?.[0] || supabaseDataChunk) as SupabaseDataChunk;
    } catch (error: any) {
      this.log('create - Error', error.message || error, true);
      throw error;
    }
  };

  public update = async (params: DataChunksCreateParams) => {
    const { data } = params;
    try {
      if (!data.data_chunk_id) {
        throw new Error(`The data chunk does not exist`);
      }

      // 1. Create a summary of the data
      const summaryData = await this.createSummary(data.formatted_data);

      // 2. Update the data chunk in the database
      const dataChunkUpdate = {
        formatted_data: data.formatted_data,
        summary: summaryData.data,
        tokens: data.tokens,
        id: data.data_chunk_id,
        ai_table_name: data.ai_table_name,
      };

      const supabaseResult = await this.supabase.updateData({
        data: [dataChunkUpdate],
        table_name: this.supabaseDBName,
      });

      if (supabaseResult.error) {
        throw supabaseResult.error;
      }

      const supabaseDataChunk = supabaseResult.data
        ? (supabaseResult.data[0] as SupabaseDataChunk) || null
        : null;

      return supabaseDataChunk;
    } catch (error: any) {
      this.log('update - Error', error.message || error, true);
      throw error;
    }
  };

  readonly respondQuestions = async (params: {
    data: SupabaseDataChunkWithQuestion[];
  }) => {
    const { data } = params;
    try {
      const respondQuestion = async (
        data: SupabaseDataChunkWithQuestion,
      ): Promise<DataChunkAnswer> => {
        const { question, formatted_data } = data;
        // 1. Create the system message
        const role =
          'Role: You are a Data Chunk Question Responder designed to answer any user prompt from the given data.';
        const instructions = `Instructions: Answer the user prompt with the given data.`;
        const constraints = `Constraints: If you don't find the answer in the data, you must respond with 'I don't know'.`;
        const dataInfo = `\nData:\n\n${formatted_data}`;

        const systemMessage = [role, instructions, constraints, dataInfo].join(
          '\n',
        );

        const messages: ChatCompletionMessageParam[] = [
          {
            role: 'system',
            content: systemMessage,
          },
          {
            role: 'user',
            content: question,
          },
        ];

        // 2. Create the question response
        const response = await new OpenAIChatCompletion({
          verbose: this.verbose,
          model: this.questionResponderModel,
          messages,
        }).call();

        // 3. Get the answer
        let answer: string | null = response.data.content!;
        const dontKnowRgx = /^(i\s+)?(really\s+)?don('|`)?t\s+know$/gi;

        if (answer.match(dontKnowRgx)) {
          answer = null;
        }

        return {
          answer: response.data.content!,
          question: question,
          data_chunk: data.id,
          costs: response.costs.total,
          usage: response.usageData.total,
        };
      };

      const responsesPromises = data.map(respondQuestion);
      const responses = await Promise.all(responsesPromises);
      const costs = responses.reduce((acc, r) => acc + r.costs, 0);
      const usage = responses.reduce((acc, r) => acc + r.usage, 0);

      return { data: responses, costs, usage };
    } catch (error: any) {
      this.log('respondQuestions - Error', error.message || error, true);
      throw error;
    }
  };
}
