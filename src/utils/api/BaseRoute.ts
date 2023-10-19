// Vendors
import { Request, Response } from 'express';
// Utils
import { niceLog } from '@utils/niceLog';
import { sendMessage as sendMessageUtil } from '@utils/api/sendMessage';

type BaseRouteParams = {
  req: Request;
  res: Response;
  verbose?: boolean;
  allowStreaming?: boolean;
};

abstract class BaseRoute {
  protected req: Request;
  protected res: Response;
  protected streaming: boolean = false;
  protected allowStreaming: boolean = false;
  protected verbose: boolean;

  constructor(params: BaseRouteParams) {
    this.req = params.req;
    this.res = params.res;
    this.verbose = params.verbose || false;
    this.allowStreaming = params.allowStreaming || false;
  }

  /**
   * @description The function to execute
   */
  abstract execute(): Promise<void>;

  private checkStreaming = () => {
    const streaming = this.req.body.streaming;
    if (streaming && this.allowStreaming) {
      if (typeof streaming !== 'boolean') {
        throw new Error('Streaming must be a boolean');
      }

      this.streaming = streaming;
      this.res.setHeader('Content-Type', 'text/event-stream');
      this.res.setHeader('Cache-Control', 'no-cache');
      this.res.setHeader('Connection', 'keep-alive');
    }
  };

  /**
   * @description Handles the route
   */
  public handle = async () => {
    try {
      this.checkStreaming();
      await this.execute();
    } catch (error) {
      this.handleError(error);
    }
  };

  /**
   * @param message The message to send
   * @description Sends streaming message if streaming is enabled
   */
  protected sendMessage = async (message: string) =>
    sendMessageUtil({ message, res: this.res, streaming: this.streaming });

  /**
   * @param title The title suffix of the log message
   * @param message The message to log
   * @description Logs a message
   */
  protected log(
    title: string | undefined,
    message: any,
    error?: boolean,
  ): void {
    if (this.verbose) {
      niceLog(
        `${this.req.path} endpoint${title ? ` - ${title}` : ''}`,
        message,
        undefined,
        error,
      );
    }
  }

  /**
   * @param error The error to handle
   * @description Handles an error
   */
  protected handleError = (error: any) => {
    this.log(`Error`, error, true);

    if (this.streaming) {
      this.sendMessage(`Error: ${error.message || error}`);
      this.res.end();
    } else {
      return this.res.status(500).send(error.message || error);
    }
  };
}

export default BaseRoute;
