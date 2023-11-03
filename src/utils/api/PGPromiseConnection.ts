import { DefaultClassParams } from '@types';
import { BaseClass } from '@utils/BaseClass';
import pgPromise from 'pg-promise';

// WORK IN PROGRESS
export class PGPromiseConnection extends BaseClass {
  private pgp = pgPromise();
  private db = this.pgp({
    host: process.env.SUPABASE_URL,
    port: (process.env.SUPABASE_PORT as number | undefined) || 5432,
    database: process.env.SUPABASE_DB_NAME,
    user: process.env.SUPABASE_USERNAME,
    password: process.env.SUPABASE_KEY,
  });

  constructor(params: DefaultClassParams) {
    super(params);

    if (!process.env.SUPABASE_URL) {
      throw new Error('SUPABASE_URL is not defined on .env file');
    }

    if (!process.env.SUPABASE_DB_NAME) {
      throw new Error('SUPABASE_DB_NAME is not defined on .env file');
    }

    if (!process.env.SUPABASE_USERNAME) {
      throw new Error('SUPABASE_USERNAME is not defined on .env file');
    }

    if (!process.env.SUPABASE_KEY) {
      throw new Error('SUPABASE_KEY is not defined on .env file');
    }
  }

  /**
   * Function to enable the vector extension.
   */
  public enableVectorExtension = async (): Promise<void> => {
    const enableVectorSQL = 'CREATE EXTENSION IF NOT EXISTS vector;';

    try {
      await this.db.none(enableVectorSQL);
      this.log(
        'enableVectorExtension',
        'Vector extension enabled successfully or already exists.',
      );
    } catch (error: any) {
      this.log('enableVectorExtension - Error', error.message || error, true);
      throw error;
    }
  };

  public createSupabaseDataTable = async () => {
    try {
      return true;
    } catch (error: any) {
      this.log('createSupabaseDataTable - Error', error.message || error, true);
      throw error;
    }
  };
}
