// Vendors
import OpenAI from 'openai';
import { ChatCompletionMessage } from 'openai/resources/chat';
// Types
import {
  DefaultClassParams,
  DynamicFunction,
  GPTModelName,
  OpenAIChatCompletionResponse as Response,
} from '@types';
// Utils
import { getModelsTokenCost } from '@utils/getModelsTokenCost';
import { BaseClass } from '@utils/BaseClass';

interface OpenAIChatCompletionProps extends DefaultClassParams {
  functions?: DynamicFunction[];
  messages: ChatCompletionMessage[];
  executeFunction?: boolean;
  model?: GPTModelName;
  temperature?: number;
}

const functionModels = [
  GPTModelName.GPT30613,
  GPTModelName.GPT316k0613,
  GPTModelName.GPT40613,
  GPTModelName.GPT432k0613,
];

export class OpenAIChatCompletion extends BaseClass {
  private openai: OpenAI;
  private model: GPTModelName = GPTModelName.GPT30613;
  private apiKey = process.env.OPENAI_API_KEY;
  private functions?: DynamicFunction[];
  private messages: ChatCompletionMessage[] = [];
  private executeFunction: boolean;
  private temperature: number = 0;

  constructor({
    model,
    verbose,
    messages,
    functions,
    executeFunction,
    temperature,
  }: OpenAIChatCompletionProps) {
    super({ verbose });
    this.openai = new OpenAI({ apiKey: this.apiKey });
    this.model = model || this.model;
    this.functions = functions;
    this.messages = messages;
    this.executeFunction = executeFunction || true;
    this.temperature = temperature || 0;
    this.titleExtra = `| model: "${this.model}" | temperature: ${this.temperature} |`;

    // Check if the model supports function callings
    if (this.functions && !functionModels.includes(this.model)) {
      throw new Error(
        `Model '${this.model}' does not support function callings.`,
      );
    }
  }

  public call = async (): Promise<Response<any>> => {
    try {
      // Generate a cache key based on input parameters
      const cacheKey = `${this.model}-${JSON.stringify(
        this.functions,
      )}-${JSON.stringify(this.messages)}-${this.temperature}`;

      const completition = await this.openai.chat.completions.create({
        model: this.model,
        temperature: this.temperature,
        functions: this.functions,
        messages: this.messages,
      });
      const usageData = {
        prompt: completition.usage?.prompt_tokens || 0,
        completion: completition.usage?.completion_tokens || 0,
        total: 0,
      };
      usageData.total = usageData.prompt + usageData.completion;

      const tokenCost = getModelsTokenCost(this.model);
      const costs = {
        prompt: tokenCost.prompt * usageData.prompt,
        completion: tokenCost.completion * usageData.completion,
        total: 0,
      };
      costs.total = costs.prompt + costs.completion;

      const response = completition.choices[0].message;
      if (response && response.function_call) {
        if (this.executeFunction) {
          this.log('Function Call - Executing function', response);
          const funcReturn = await this._executeFunction(
            response.function_call,
          );
          if (funcReturn !== undefined) {
            this.log('Function Call - What the function returned', funcReturn);
            return { data: funcReturn, usageData, costs };
          }
        }
      }

      this.log('call - Chat Completion Response:', response);

      return { data: response, usageData, costs };
    } catch (error) {
      this.log('call - Error creating chat completion:', error);
      throw new Error(`Open AI Chat Completition\n\n${error}`);
    }
  };

  private _executeFunction = async (
    _function: ChatCompletionMessage.FunctionCall,
  ): Promise<any> => {
    try {
      const funcArgs = _function?.arguments;
      const func = this.getFunction(_function);
      if (func && func?.call) {
        let parsedFuncArgs: any;
        if (funcArgs) {
          try {
            parsedFuncArgs = JSON.parse(funcArgs);
          } catch (err) {
            parsedFuncArgs = this.jsonParseFixer(funcArgs);
          }
        }
        parsedFuncArgs = { ...parsedFuncArgs, verbose: this.verbose };
        const funcReturn = await func?.call(parsedFuncArgs);
        if (funcReturn !== undefined) {
          return funcReturn;
        }
      }
    } catch (err: any) {
      throw new FunctionCallError(
        `Error occurred while executing the function ${
          _function.name || ''
        }: ` + err.message || err,
      );
    }
  };

  private getFunction = (
    _function: ChatCompletionMessage.FunctionCall,
  ): DynamicFunction => {
    const func = this.functions?.find((func) => func.name === _function?.name);
    if (func) {
      return func;
    }

    throw new Error(`Function '${_function.name}' not found.`);
  };

  private jsonParseFixer = (json: string) => {
    try {
      return JSON.parse(json.replace(/'/g, ''));
    } catch (err) {
      throw new Error(`Failed to parse the function arguments`);
    }
  };
}

class FunctionCallError extends Error {
  constructor(
    message: string,
    public innerError?: Error,
  ) {
    super(message);
    this.name = 'FunctionCallError';
  }
}
