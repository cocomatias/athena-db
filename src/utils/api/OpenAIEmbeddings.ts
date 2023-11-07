// Vendors
import { Decimal } from 'decimal.js';
import OpenAI from 'openai';
// Utils
import { BaseClass } from '@utils/BaseClass';
import { DefaultClassParams, OpenAIEmbeddingsResponse } from '@types';

type OpenAIEmbeddingsParams = DefaultClassParams & {
  text: string;
};

export class OpenAIEmbeddings extends BaseClass {
  private openai: OpenAI;
  private model: string = 'text-embedding-ada-002';
  private text: string;
  private costPerToken = new Decimal('0.0001').dividedBy(1000);
  readonly dimensions = 1536;
  readonly tokensLimit = 8000;

  constructor(params: OpenAIEmbeddingsParams) {
    super(params);
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    this.text = params.text;
  }

  public call = async (): Promise<OpenAIEmbeddingsResponse> => {
    try {
      const response = await this.openai.embeddings.create({
        model: this.model,
        input: this.text,
      });
      const embedding = response.data[0].embedding;
      const cost = new Decimal(response.usage.total_tokens)
        .times(this.costPerToken)
        .toFixed(7);

      this.log('call - Response', {
        cost,
        dimension: embedding.length,
        usage: response.usage,
      });

      return {
        cost,
        usage: response.usage,
        data: embedding,
      };
    } catch (error: any) {
      this.log('call - Error', error.message || error, true);
      throw error;
    }
  };
}
