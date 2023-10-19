import { ChatCompletionCreateParams } from 'openai/resources/chat';

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

/*
 * ========= Streaming =========
 */
export type SendMessageFunction = {
  sendMessageFunction?: (message: string) => Promise<void>;
};
