import {
  AskParams,
  DataChunkAnswer,
  DefaultClassParams,
  GPTModelName,
} from '@types';
import { BaseClass } from '@utils/BaseClass';
import { QuestionAssigner } from './QuestionAssigner';
import { getTokensLimit } from '@utils/getTokensLimit';
import { getStringFromObject } from '@utils/getStringFromObject';
import { ChatCompletionMessageParam } from 'openai/resources';
import { getTokens } from '@utils/getTokens';
import { OpenAIChatCompletion } from './OpenAIChatCompletion';

export class DataResponder extends BaseClass {
  private _questionAssigner?: QuestionAssigner;
  private totalCosts = 0;
  private totalUsage = 0;
  private conclusionModel: GPTModelName = GPTModelName.GPT316k;
  private tokensLimit = getTokensLimit(this.conclusionModel);

  constructor(params: DefaultClassParams) {
    super(params);
  }

  // Lazy initializer for QuestionAssigner
  private get questionAssigner(): QuestionAssigner {
    if (!this._questionAssigner) {
      this._questionAssigner = new QuestionAssigner({ verbose: this.verbose });
    }
    return this._questionAssigner;
  }

  readonly getConclusionMessages = async (
    data: DataChunkAnswer[],
    question: string,
  ) => {
    const role = `Role: You are are an AI designed to create a conclusion from a set of data responses made by other AIs.`;
    const instructions = `Instructions: You have to create a conclusion answer to the user question based on the data responses made by other AIs.`;
    const constraints = `Constraints: You can only respond with the data given by the other AIs. You can't use any other data, even if you know the answer. The answers from the other AIs are the source of truth.`;

    const dataInfo = data
      .map((d) => ({
        answer: d.answer || 'No answer',
        question: d.question,
      }))
      .map((d) => getStringFromObject(d, 1))
      .join('\n\n');
    const dataMessage = `\nAIs responses:\n\n${
      dataInfo.length ? dataInfo : 'No responses'
    }`;

    const systemMessage = [role, instructions, constraints, dataMessage].join(
      '\n',
    );

    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: systemMessage,
      },
      {
        role: 'user',
        content: `Create a conclusion from the AI responses for the question: "${question}"`,
      },
    ];

    const messagesTokens = await getTokens(
      messages.map((m) => m.content).join(''),
    );

    if (messagesTokens > this.tokensLimit) {
      throw new Error(
        `The messagesTokens (${messagesTokens}) is greater than the tokensLimit (${this.tokensLimit})`,
      );
    }

    return { data: messages, tokens: messagesTokens };
  };

  readonly ask = async (params: AskParams) => {
    const { question, ai_table_name } = params;
    try {
      // 1. Get the DataChunk answers
      const dataChunkAnswers = await this.questionAssigner.getDataChunkAnswers({
        question,
        ai_table_name,
      });

      this.totalCosts += dataChunkAnswers.cost;
      this.totalUsage += dataChunkAnswers.usage;

      // 2. Get Conclusion messages
      const getConclusionMessages = await this.getConclusionMessages(
        dataChunkAnswers.data,
        question,
      );

      this.log(
        'ask',
        `Data Chunks responded ${dataChunkAnswers.data.length} questions.\nCreating conclusion...`,
      );

      // 3. Create Conclusion
      const conclusionRequest = await new OpenAIChatCompletion({
        model: this.conclusionModel,
        verbose: this.verbose,
        messages: getConclusionMessages.data,
      }).call();

      this.totalCosts += conclusionRequest.costs.total;
      this.totalUsage += conclusionRequest.usageData.total;

      const conclusion = conclusionRequest.data.content!;
      this.log(
        'ask',
        `Conclusion created!\n\nTotal Cost: ${this.totalCosts}\nTotal Usage: ${this.totalUsage}\n\nConclusion: ${conclusion}`,
      );

      return {
        answer: conclusion,
        question,
        costs: this.totalCosts,
        usage: this.totalUsage,
      };
    } catch (error: any) {
      this.log('ask - Error', error.message || error, true);
      throw new Error(error.message || error);
    }
  };
}
