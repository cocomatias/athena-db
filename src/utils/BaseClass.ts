import { DefaultClassParams, SendMessageFunction } from '@types';
import { niceLog } from './niceLog';
import { SupabaseConnection } from './api/SupabaseConnection';

type BaseClassParams = DefaultClassParams &
  SendMessageFunction & {
    titleExtra?: any;
  };

/**
 * Represents a class to manage logging.
 * @param params.verbose - Optional constructor parameter to enable verbose logging.
 * @param params.titleExtra - Optional constructor parameter to add extra information to the log title.
 */
export class BaseClass {
  protected verbose?: boolean;
  protected titleExtra?: string;
  protected today = new Date().toLocaleString();
  protected sendMessageFunction: SendMessageFunction['sendMessageFunction'];
  private className = this.constructor.name; // Dynamically get the class name
  // Make it a private nullable field.
  private _supabase?: SupabaseConnection;

  // Lazy getter method.
  get supabase(): SupabaseConnection {
    if (!this._supabase) {
      this._supabase = SupabaseConnection.getInstance(this.verbose);
    }
    return this._supabase;
  }

  constructor(params: BaseClassParams) {
    this.verbose = params.verbose;
    this.titleExtra = params.titleExtra;
    this.sendMessageFunction = params.sendMessageFunction;
  }

  /**
   * @param title - The title of the log
   * @param message - The message to log
   * @param error - Optional parameter to log as an error
   */
  readonly log = (title: string, message: any, error?: boolean): void => {
    if (this.verbose) {
      const titleExtra = this.titleExtra ? ` ${this.titleExtra}` : '';
      const fullTitle = `${this.className}${titleExtra} - ${title}`;
      niceLog(fullTitle, message, undefined, error);
    }
  };

  /**
   * @param message - The message to send
   * @param prefix - Optional parameter to add a prefix to the message. If it's false, no prefix will be added.
   */
  readonly sendMessage = async (message: string, prefix?: string | false) => {
    if (this.sendMessageFunction) {
      if (typeof prefix === 'boolean' && !prefix) {
        await this.sendMessageFunction(message);
      } else {
        const msgPrefix = prefix || this.className;
        const msg = `${msgPrefix}: ${message}`;
        await this.sendMessageFunction(msg);
      }
    }
  };
}
