// Vendors
import OpenAI from 'openai';
import {
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
  ChatCompletionTool,
} from 'openai/resources/chat';
// Types
import {
  DefaultClassParams,
  GPTModelName,
  OpenAIChatCompletionResponse as Response,
} from '@types';
// Utils
import { getModelsTokenCost } from '@utils/getModelsTokenCost';
import { BaseClass } from '@utils/BaseClass';

interface OpenAIChatCompletionProps extends DefaultClassParams {
  tools?: ChatCompletionTool[];
  messages: ChatCompletionMessageParam[];
  executeTools?: boolean;
  model?: GPTModelName;
  temperature?: number;
}

const functionModels = [
  GPTModelName.GPT30613,
  GPTModelName.GPT316k0613,
  GPTModelName.GPT316k,
  GPTModelName.GPT40613,
  GPTModelName.GPT432k0613,
  GPTModelName.GPT4TURBO,
];

export class OpenAIChatCompletion extends BaseClass {
  private openai: OpenAI;
  private model: GPTModelName = GPTModelName.GPT30613;
  private apiKey = process.env.OPENAI_API_KEY;
  private tools?: ChatCompletionTool[];
  private messages: ChatCompletionMessageParam[] = [];
  private executeFunction: boolean;
  private temperature: number = 0;

  constructor({
    model,
    verbose,
    messages,
    tools: functions,
    executeTools: executeFunction,
    temperature,
  }: OpenAIChatCompletionProps) {
    super({ verbose });
    this.openai = new OpenAI({ apiKey: this.apiKey });
    this.model = model || this.model;
    this.tools = functions;
    this.messages = messages;
    this.executeFunction = executeFunction || true;
    this.temperature = temperature || 0;
    this.titleExtra = `| model: "${this.model}" | temperature: ${this.temperature} |`;

    // Check if the model supports function callings
    if (this.tools && !functionModels.includes(this.model)) {
      throw new Error(
        `Model '${this.model}' does not support function callings.`,
      );
    }
  }

  public call = async (): Promise<Response<any>> => {
    try {
      // Generate a cache key based on input parameters
      const cacheKey = `${this.model}-${JSON.stringify(
        this.tools,
      )}-${JSON.stringify(this.messages)}-${this.temperature}`;

      const completition = await this.openai.chat.completions.create({
        model: this.model,
        temperature: this.temperature,
        tools: this.tools,
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
      if (response.tool_calls) {
        for (const tool of response.tool_calls) {
          if (tool.function) {
            const args = JSON.parse(tool.function.arguments);
            tool.function.arguments = args;
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

  // TODO: Fix function/tools callings
  // private _executeTools = async (
  //   tools: ChatCompletionMessageToolCall,
  // ): Promise<any> => {
  //   try {
  //     const func = this.getTool(tools);
  //     if (func && func?.function.) {
  //       let parsedFuncArgs: any;
  //       if (tools) {
  //         try {
  //           parsedFuncArgs = JSON.parse(tools.function.arguments);
  //         } catch (err) {
  //           parsedFuncArgs = this.jsonParseFixer(tools.function.arguments);
  //         }
  //       }
  //       parsedFuncArgs = { ...parsedFuncArgs, verbose: this.verbose };
  //       const funcReturn = await func?.call(parsedFuncArgs);
  //       if (funcReturn !== undefined) {
  //         return funcReturn;
  //       }
  //     }
  //   } catch (err: any) {
  //     throw new FunctionCallError(
  //       `Error occurred while executing the function ${
  //         tools.function.name || ''
  //       }: ` + err.message || err,
  //     );
  //   }
  // };

  private getTool = (
    tools: ChatCompletionMessageToolCall,
  ): ChatCompletionTool => {
    const func = this.tools?.find(
      (func) => func.function.name === tools?.function.name,
    );
    if (func) {
      return func;
    }

    throw new Error(`Function '${tools.function.name}' not found.`);
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
