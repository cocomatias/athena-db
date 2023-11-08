// Vendors
import { Request, Response } from 'express';
// Utils
import { niceLog } from '@utils/niceLog';
import { sendMessage as sendMessageUtil } from '@utils/api/sendMessage';
import { BaseRouteParams } from '@types';

abstract class BaseRoute {
  readonly req: Request;
  readonly res: Response;
  private streaming: boolean = false; // The checkStreaming function is the only one that can set this property
  protected allowStreaming: boolean = false; // Whether to allow streaming or not
  protected verbose: boolean; // Whether to log messages or not

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

  /**
   * @description Checks if streaming is enabled and sets the headers accordingly. Its also responsible for setting the streaming property across the class.
   */
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
  readonly handle = async () => {
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
  readonly sendMessage = async (message: string) =>
    sendMessageUtil({ message, res: this.res, streaming: this.streaming });

  /**
   * @param title The title suffix of the log message
   * @param message The message to log
   * @description Logs a message
   */
  readonly log = (
    title: string | undefined,
    message: any,
    error?: boolean,
  ): void => {
    if (this.verbose) {
      niceLog(
        `${this.req.path} endpoint${title ? ` - ${title}` : ''}`,
        message,
        undefined,
        error,
      );
    }
  };

  /**
   * @param error The error to handle
   * @description Handles an error
   */
  readonly handleError = (error: any) => {
    this.log(`Error`, error, true);

    // Check if headers have already been sent
    if (!this.res.headersSent) {
      if (this.streaming) {
        this.sendMessage(`Error: ${error.message || error}`);
        this.res.end();
      } else {
        this.res.status(500).send(error.message || error);
      }
    } else {
      // If the headers have already been sent, log the error, but do not attempt to send another response
      this.log(
        'Failed to send error response because headers have already been sent',
        error,
        true,
      );
    }
  };

  /**
   * @param response The response to return
   * @description Returns a response
   * @returns The response. If streaming is enabled, it will send the response and end the request, else it will return the response.
   */
  readonly returnResponse = (response?: any) => {
    if (typeof response === 'number') {
      throw new Error('Response is a number. It must be an object or string');
    }

    if (this.streaming) {
      if (response) {
        response =
          typeof response === 'string' ? response : JSON.stringify(response);
        this.sendMessage(response);
      }
      this.res.end();
    } else {
      if (!response) {
        throw new Error('Response is undefined');
      }
      return this.res.send(response);
    }
  };
}

export default BaseRoute;
