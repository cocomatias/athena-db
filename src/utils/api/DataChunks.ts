import { BaseClass } from '@utils/BaseClass';
import { SupabaseConnection } from './SupabaseConnection';
import {
  AssignedDataChunk,
  DataChunkInsert,
  DefaultClassParams,
  DefaultGPTCompletionResponse,
  GPTModelName,
  OpenAIChatCompletionResponse,
  SupabaseDBNames,
  SupabaseDataChunk,
  SupabaseGetDataResponse,
} from '@types';
import { getTokensLimit } from '@utils/getTokensLimit';
import { getTokens } from '@utils/getTokens';
import { ChatCompletionMessage } from 'openai/resources';
import { OpenAIChatCompletion } from './OpenAIChatCompletion';
import { OpenAIEmbeddings } from './OpenAIEmbeddings';

type DataChunkGetParams = {
  ai_table_name?: string | string[];
  avialableTokens?: number;
  tokensAscending?: boolean;
  data_chunk_ids?: string[];
};

type DataChunksCreateParams = {
  data: AssignedDataChunk;
};

type DataChunksUpdateParams = {
  data: AssignedDataChunk;
};

export class DataChunks extends BaseClass {
  private supabase = new SupabaseConnection(this.verbose);
  private supabaseDBName: SupabaseDBNames = 'ai_db_data_chunk';
  public tokensLimit = 14900; // The tokens limit for the data inside the data chunk
  private summarizerModel: GPTModelName = GPTModelName.GPT316k;
  private summarierTokensLimit = getTokensLimit(this.summarizerModel); // The tokens limit for the summarizer model

  constructor(params: DefaultClassParams) {
    super(params);
  }

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
      const dataMessage = `Summarize the following data:\n\n\`\`\`${formatted_data}\`\`\``;

      const messages: ChatCompletionMessage[] = [
        {
          role: 'system',
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

      // 4. Create the summarization
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

      // TODO: Check how to embed data of more than 8k tokens
      // this.log('createSummary', 'Creating summary embeddings...');
      // const summaryEmbedding = await new OpenAIEmbeddings({
      //   verbose: this.verbose,
      //   text: summary.data.content,
      // }).call();

      const response = {
        summary: {
          data: summary.data.content,
          costs: summary.costs,
          usageData: summary.usageData,
        },
        summaryEmbedding: {
          data: [],
          costs: 0,
          usageData: 0,
        },
      };

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

  /**
   * @description Gets data chunks based on the parameters
   * @param ai_table_name The AI table name to get the data chunks from
   * @param avialableTokens The available tokens that the data chunk should have. If not provided, it will not be used
   * @param tokensAscending If true, the query will order the data by tokens ascending. If false, it will order by tokens descending, and if not provided, it will not be used
   * @returns The data chunks that match the parameters
   */
  public get = async (params: DataChunkGetParams = {}) => {
    const { ai_table_name, tokensAscending, avialableTokens, data_chunk_ids } =
      params;
    const maxTokens = avialableTokens && this.tokensLimit - avialableTokens;

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
        `Data tokens: ${data.tokens}\n\nData Summary tokens: ${summaryData.summary.usageData.completion}`,
      );

      // 3. Create the data chunk in the database
      this.log('create', 'Creating data chunk in the database...');
      const dataChunk: DataChunkInsert = {
        formatted_data: data.formatted_data,
        ai_table_name: data.ai_table_name,
        summary: summaryData.summary.data,
        tokens: data.tokens,
        summary_embedding: summaryData.summaryEmbedding.data,
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

      return supabaseDataChunk;
    } catch (error: any) {
      this.log('create - Error', error.message || error, true);
      throw error;
    }
  };

  public update = async (params: DataChunksUpdateParams) => {
    try {
      const { data } = params;
      // 1. Check if the data chunk exists
      this.log('update', 'Checking if the data chunk exists...');

      if (!data.data_chunk_id) {
        throw new Error(`The data chunk does not exist`);
      }

      // TODO: When embeddings token limit is increased, uncomment this
      // if (!data.summary_embedding) {
      //   throw new Error(`The data chunk does not have a summary embedding`);
      // }

      const checkDataChunk: SupabaseGetDataResponse<SupabaseDataChunk> =
        await this.supabase.getData({
          ids: [data.data_chunk_id],
          table_name: this.supabaseDBName,
        });

      if (checkDataChunk.error) {
        throw checkDataChunk.error;
      }

      if (!checkDataChunk.data) {
        throw new Error(`The data chunk does not exist`);
      }

      // 2.

      // return supabaseDataChunk;
    } catch (error: any) {
      this.log('update - Error', error.message || error, true);
      throw error;
    }
  };
}
