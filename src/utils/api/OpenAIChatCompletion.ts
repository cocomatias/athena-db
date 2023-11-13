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
import abortablePromise from './abortablePromise';

interface OpenAIChatCompletionProps extends DefaultClassParams {
  tools?: ChatCompletionTool[];
  messages: ChatCompletionMessageParam[];
  executeTools?: boolean;
  model?: GPTModelName;
  temperature?: number;
  timeout?: number; // When to abort the request
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
  private temperature: number = 0;
  private timeout?: number;

  constructor({
    model,
    verbose,
    messages,
    tools: functions,
    temperature,
    timeout,
  }: OpenAIChatCompletionProps) {
    super({ verbose });
    this.openai = new OpenAI({ apiKey: this.apiKey });
    this.model = model || this.model;
    this.tools = functions;
    this.messages = messages;
    this.temperature = temperature || 0;
    this.titleExtra = `| model: "${this.model}" | temperature: ${this.temperature} |`;
    this.timeout = timeout;

    // Check if the model supports function callings
    if (this.tools && !functionModels.includes(this.model)) {
      throw new Error(
        `Model '${this.model}' does not support function callings.`,
      );
    }
  }

  private _callFunction = async () => {
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

    return { data: response, usageData, costs };
  };

  public call = async (): Promise<Response<any>> => {
    try {
      // Generate a cache key based on input parameters
      const cacheKey = `${this.model}-${JSON.stringify(
        this.tools,
      )}-${JSON.stringify(this.messages)}-${this.temperature}`;

      let response: Response<any>;

      if (this.timeout) {
        response = await abortablePromise(
          this._callFunction(),
          this.timeout,
        );
      } else {
        response = await this._callFunction();
      }

      this.log('call - Chat Completion Response:', response.data);
      return response;
    } catch (error) {
      this.log('call - Error creating chat completion:', error);
      throw new Error(`Open AI Chat Completition\n\n${error}`);
    }
  };
}
