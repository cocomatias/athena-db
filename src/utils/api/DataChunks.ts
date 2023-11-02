import { BaseClass } from '@utils/BaseClass';
import { SupabaseConnection } from './SupabaseConnection';
import {
  SupabaseDBNames,
  SupabaseDataChunk,
  SupabaseGetDataResponse,
} from '@types';

type DataChunksParams = {
  verbose?: boolean;
};

type DataChunkGetParams = {
  ai_table_name?: string | string[];
  tokensAscending?: boolean;
};

type DataChunkGetAvailableParams = {
  ai_table_name: string | string[];
  avialableTokens?: number;
  tokensAscending?: boolean;
};

export class DataChunks extends BaseClass {
  private supabase = new SupabaseConnection(this.verbose);
  private supabaseDBName: SupabaseDBNames = 'ai_db_data_chunk';
  public tokensLimit = 15000;

  constructor(params: DataChunksParams) {
    super(params);
  }

  public get = async (params: DataChunkGetParams = {}) => {
    const { ai_table_name, tokensAscending } = params;
    try {
      const data: SupabaseGetDataResponse<SupabaseDataChunk> =
        await this.supabase.getData({
          table_name: this.supabaseDBName,
          ai_table_name,
          tokensAscending,
        });

      return data;
    } catch (error: any) {
      this.log('get - Error', error.message || error, true);
      throw error;
    }
  };

  /**
   * @description Gets data chunks with available tokens
   * @param ai_table_name The AI table name
   * @param avialableTokens The available tokens (`optional`) (by default `50`)
   * @returns The data chunks with available tokens
   */
  public getAvailable = async (params: DataChunkGetAvailableParams) => {
    const { ai_table_name, tokensAscending } = params;
    const maxTokens = this.tokensLimit - (params.avialableTokens || 50);

    try {
      const dataChunks = await this.supabase.getData({
        ai_table_name,
        table_name: this.supabaseDBName,
        maxTokens,
        tokensAscending,
      });

      return dataChunks;
    } catch (error: any) {
      this.log('getAvailable - Error', error.message || error, true);
      throw error;
    }
  };
}
