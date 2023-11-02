// Vendors
import { ChatCompletionCreateParams } from 'openai/resources/chat';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import OpenAI from 'openai';
/*
 * ========= OpenAI =========
 */
export type OpenAIFunctionParemetersTypes =
  | 'string'
  | 'object'
  | 'number'
  | 'array'
  | 'boolean';

export interface OpenAISimpleFunctionParameters {
  [name: string]: {
    type: OpenAIFunctionParemetersTypes;
    description: string;
    enum?: (string | number)[];
  };
}

export type OpenAIFunctionParameters =
  | {
      [name: string]: {
        type: OpenAIFunctionParemetersTypes;
        description: string;
        items?: OpenAIFunctionParameters;
        properties?: OpenAIFunctionParameters;
      };
    }
  | OpenAISimpleFunctionParameters;
export interface FunctionInfo {
  name: string;
  description: string;
  call: (args?: any) => void;
}
export interface FunctionParameters {
  type: OpenAIFunctionParemetersTypes;
  description: string;
  required?: boolean;
  name: string;
  items?: FunctionParameters[];
  properties?: FunctionParameters[];
  enum?: (string | number)[];
}
export interface CreateFunctionTypes {
  _function: FunctionInfo;
  parameters?: FunctionParameters[];
}
export interface DynamicFunction extends ChatCompletionCreateParams.Function {
  call: (args?: any) => void;
}

export interface OpenAIChatCompletionResponse {
  data: any;
  usageData: {
    prompt: number;
    completion: number;
  };
  costs: {
    prompt: number;
    completion: number;
    total: number;
  };
}

export enum GPTModelName {
  GPT4 = 'gpt-4',
  GPT40314 = 'gpt-4-0314',
  GPT40613 = 'gpt-4-0613',
  GPT432k = 'gpt-4-32k',
  GPT432k0314 = 'gpt-4-32k-0314',
  GPT432k0613 = 'gpt-4-32k-0613',
  GPT3 = 'gpt-3.5-turbo',
  GPT316k = 'gpt-3.5-turbo-16k',
  GPT30301 = 'gpt-3.5-turbo-0301',
  GPT30613 = 'gpt-3.5-turbo-0613',
  GPT316k0613 = 'gpt-3.5-turbo-16k-0613',
}

export type OpenAIEmbeddingsResponse = {
  cost: string;
  usage: OpenAI.Embeddings.CreateEmbeddingResponse.Usage;
  data: number[];
};

/*
 * ========= Streaming =========
 */
export type SendMessageFunction = {
  sendMessageFunction?: (message: string) => Promise<void>;
};

/*
 * ========= AI DB Data =========
 */
export type DataWithTokens = {
  tokens: number;
  [key: string]: any;
};

/*
 * ========= Supabase =========
 */
export type SupabaseQuery = PostgrestFilterBuilder<any, any, any[], unknown>;

export type BaseQueryParams = {
  table_name: SupabaseDBNames; // The Supabase table name
  ai_table_name?: string | string[]; // The AI DB table name
  maxTokens?: number;
  tokensAscending?: boolean; // If true, the query will order the data by tokens ascending
};

export type BuildQueryParams = BaseQueryParams & {
  range?: [number, number]; // The range of data to fetch. We use this because Supabase doesn't support pagination, and it has a limit of 1000 rows per request (https://supabase.io/docs/reference/javascript/select)
  count?: boolean;
};

export type BaseSupabaseResponse = {
  created_at: string;
  updated_at: string;
  id: string;
};

export type SupabaseData = BaseSupabaseResponse & {
  data: Record<string, any>;
  ai_table_name: string;
  data_chunk: string | null; // Initially, this is null. After the data chunk is created, this will be the data chunk id
  embedding: number[];
  tokens: number;
  formatted_data: string;
};

export type SupabaseAIDBTable = BaseSupabaseResponse & {
  name: string;
  description: string;
};

export type SupabaseDataChunk = BaseSupabaseResponse & {
  formattedData: string;
  summary: string;
  ai_table_name: string;
  tokens: number;
};

export type SupabaseDBNames = 'ai_db_data' | 'ai_db_table' | 'ai_db_data_chunk';

export type SupabaseGetDataResponse<T> = {
  data: T[] | null;
  error: string | null;
};

/*
 * ========= Supabase Connection Methods Parameters =========
 */
export type SupabaseUpdateDataFunctionParams = {
  table_name: SupabaseDBNames;
  data: AIDBTableUpdate | DataUpdate | DataChunkUpdate;
  id: string;
};

/*
 * ========= Supabase insert or update =========
 */
export type AIDBTableUpdate = {
  description?: string;
  name?: string;
};

export type AIDBTableInsert = {
  name: string;
  description?: string;
};

export type DataUpdate = {
  data?: Record<string, any>;
  ai_table_name?: string;
  data_chunk?: string;
};

export type DataInsert = Omit<
  SupabaseData,
  'created_at' | 'updated_at' | 'data_chunk' | 'id'
>;

export type DataChunkUpdate = {
  formattedData?: string;
  summary?: string;
  ai_table_name?: string;
};

export type DataChunkInsert = {
  formattedData: string;
  summary: string;
  ai_table_name: string;
};

/*
 * ========= Data Manager =========
 */
export type AddDataParams = {
  data: Record<string, any>;
  ai_table_name: string;
  data_chunk?: string;
};

export type GroupedDataObject = {
  ai_table_name: string;
  data: DataInsert[];
};
