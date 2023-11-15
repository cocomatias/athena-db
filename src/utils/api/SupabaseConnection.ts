// Vendors
import { Pool } from 'pg';
import {
  SupabaseClient,
  createClient,
  PostgrestError,
} from '@supabase/supabase-js';
// Types
import {
  DataChunkInsert,
  DataInsert,
  AIDBTableInsert,
  BaseQueryParams,
  BuildQueryParams,
  SupabaseDBNames,
  SupabaseQuery,
  SupabaseUpdateDataFunctionParams,
  SupabaseGetDataResponse,
} from '@types';
// Utils
import { BaseClass } from '@utils/BaseClass';
import { chunkArrayBySize } from '@utils/chunkArrayBySize';
import { generateRanges } from '@utils/generateRanges';

export class SupabaseConnection extends BaseClass {
  private supabaseUrl: string;
  private supabaseKey: string;
  private supabaseConnectionString: string =
    process.env.TEST_SUPABASE_CONNECTION_STRING || '';
  private pool = new Pool({
    connectionString: this.supabaseConnectionString,
    ssl: {
      rejectUnauthorized: false, // Adjust SSL settings as needed
    },
  });
  public supabaseInstace: SupabaseClient<any, 'public', any>;
  // Singleton instance
  private static instance: SupabaseConnection;

  private constructor(verbose?: boolean) {
    super({ verbose });
    this.supabaseUrl = process.env.SUPABASE_URL || '';
    this.supabaseKey = process.env.SUPABASE_KEY || '';
    this.supabaseInstace = createClient(this.supabaseUrl, this.supabaseKey, {
      auth: {
        persistSession: false,
      },
    });
  }

  /**
   * @description Creates Supabase Query
   * @param params The parameters to build the query
   * @returns The `SupabaseQuery` object
   */
  private buildQuery = (params: BuildQueryParams): SupabaseQuery => {
    const {
      table_name,
      range,
      count,
      ai_table_name,
      maxTokens,
      tokensAscending,
      ids,
      data_chunk_id,
    } = params;
    const supabaseTablesWithTokens: SupabaseDBNames[] = [
      'ai_db_data',
      'ai_db_data_chunk',
    ];
    let query: SupabaseQuery;

    if (count) {
      query = this.supabaseInstace
        .from(table_name)
        .select('*', { count: 'exact', head: true });
    } else {
      query = this.supabaseInstace.from(table_name).select('*');
    }

    if (ai_table_name) {
      // ai_table_name refers to the Supabase ai_db_table `name` column
      let columnName = 'ai_table_name';
      if (table_name === 'ai_db_table') {
        columnName = 'name';
      }

      if (ai_table_name instanceof Array) {
        query = query.in(columnName, ai_table_name);
      } else {
        query = query.eq(columnName, ai_table_name);
      }
    }

    if (range && !count) {
      query.range(range[0], range[1]);
    }

    if (maxTokens && !supabaseTablesWithTokens.includes(table_name)) {
      const errorMsg = `maxTokens is not supported for '${table_name}' table`;
      this.log(`buildQuery - Error`, errorMsg, true);
      throw new Error(errorMsg);
    }

    if (maxTokens) {
      query.lte('tokens', maxTokens);
    }

    if (tokensAscending && !supabaseTablesWithTokens.includes(table_name)) {
      const errorMsg = `tokensAscending is not supported for '${table_name}' table`;
      this.log(`buildQuery - Error`, errorMsg, true);
      throw new Error(errorMsg);
    }

    if (
      tokensAscending !== undefined &&
      supabaseTablesWithTokens.includes(table_name)
    ) {
      query.order('tokens', { ascending: tokensAscending });
    }

    if (data_chunk_id) {
      if (table_name !== 'ai_db_data') {
        throw new Error(
          `data_chunk_id is not supported for '${table_name}' table`,
        );
      }

      query.eq('data_chunk', data_chunk_id);
    }

    if (ids) {
      if (!Array.isArray(ids)) {
        throw new Error(`ids param must be an array`);
      }
      if (ids.some((id) => typeof id !== 'string')) {
        throw new Error(`All ids must be strings`);
      }
      query.in('id', ids);
    }

    return query;
  };

  /**
   * @description Executes an array of `SupabaseQueries`
   * @param queries The `SupabaseQuery` array to execute
   * @param table_name The Supabase table name. We use this just to log the table name
   * @returns The Supabase response
   */
  private executeQueries = async (params: {
    queries: SupabaseQuery[];
    table_name: SupabaseDBNames;
  }) => {
    const { queries, table_name } = params;
    const queriesChunks = chunkArrayBySize({
      arr: queries,
      size: 10,
    }) as SupabaseQuery[][]; // We limit this to prevent Supabase from throwing a "too many requests" error

    const data: any[] = [];
    let error: string = '';

    for (let i = 0; i < queriesChunks.length; i++) {
      const chunk = queriesChunks[i];
      const chunkResults = await Promise.all(chunk);

      chunkResults.forEach((result) => {
        if (result.error) {
          const pgError = result.error;
          error = pgError.message;
        } else {
          data.push(...result.data);
        }
      });

      this.log(
        `executeQueries - ${i + 1}/${
          queriesChunks.length
        } chunks for '${table_name}' table`,
        {
          totalRecords: data.length,
          recordsOnChunk: chunkResults
            .map((r) => r.data && r.data.length)
            .reduce((acc, curr) => acc! + curr!, 0),
          errors: error || null,
        },
      );
    }

    return { data, error: error || null };
  };

  /**
   * Retrieves data from a Supabase table in chunks, using pagination.
   * @param params - The query parameters, including the table name and any filters or sorting options.
   * @returns A promise that resolves to a `SupabaseGetDataResponse` object containing the retrieved data and any errors.
   */
  readonly getData = async (
    params: BaseQueryParams,
  ): Promise<SupabaseGetDataResponse<any>> => {
    const { table_name, ai_table_name } = params;

    try {
      // 1. Count the total number of records
      const { data: countData, error: countError } = await this.countData(
        params,
      );

      if (countError) {
        throw new Error(countError);
      }

      this.log(
        'getData',
        `Total records: ${countData} | Table: ${table_name} | AI Table: ${ai_table_name}`,
      );

      // 2. Split the records in ranges of numbers
      const ranges = generateRanges({
        totalRecords: countData!,
        rangeDistance: 900,
      });

      // 3. Create the queries
      const queries = ranges.map((range) =>
        this.buildQuery({ ...params, range }),
      );

      // 4. Execute the queries in parallel and in chunks
      const results = await this.executeQueries({
        table_name: table_name,
        queries: queries,
      });

      // Parse the embedding strings to number arrays
      results.data?.forEach((record) => {
        for (const key in record) {
          const value = record[key];
          if (key.includes('embedding') && typeof value === 'string') {
            record[key] = JSON.parse(value);
          }
        }
      });

      return results;
    } catch (error: any) {
      this.log(`getData - Error on '${table_name}' table`, error);
      return { data: null, error: error.message };
    }
  };

  /**
   * @description Counts the total number of records for a Supabase table
   * @param ai_table_name The AI DB table name
   * @param table_name The Supabase table name to execute the query on.
   * @returns The total number of records
   */
  readonly countData = async (params: BaseQueryParams) => {
    try {
      const query = this.buildQuery({ ...params, count: true });

      const { error, count, data } = await query;

      if (error) {
        throw error;
      }
      const responseData = count || data;

      return { data: responseData as number, error };
    } catch (error) {
      const pgError = error as PostgrestError;
      let errorMsg = `Error counting data for ${params.table_name}: ${pgError.message}`;
      if (!pgError.message) {
        errorMsg = `No data found for ${params.table_name} table`;
      }
      this.log('countData - Error', errorMsg, true);
      return {
        data: null,
        error: errorMsg,
      };
    }
  };

  /**
   * @description Inserts data into a Supabase table
   * @param table_name The Supabase table name
   * @param data The data to insert
   * @returns The Supabase response
   */
  readonly insertData = async ({
    table_name,
    data,
  }: {
    table_name: SupabaseDBNames;
    data: (AIDBTableInsert | DataInsert | DataChunkInsert)[];
  }) => {
    let response: any | any[];
    const updated_at = new Date();
    const insertData = data.map((d) => ({ ...d, updated_at }));

    const {
      data: responseData,
      error,
      statusText,
    } = await this.supabaseInstace.from(table_name).insert(insertData).select();

    response = responseData;
    if (error) {
      response = statusText;
    }

    return { data: response, error };
  };

  /**
   * @description Updates data in a Supabase table
   * @param id The id of the record to update. (For 'ai_db_table' table, this is the `name` column)
   * @param table_name The Supabase table name
   * @param data The data to update
   * @returns The Supabase response
   */
  readonly updateData = async (params: SupabaseUpdateDataFunctionParams) => {
    const { table_name, data } = params;
    let response: any[] | null | string;
    const updated_at = new Date();
    const dataToInsert = data.map((d) => ({ ...d, updated_at }));

    const query = this.supabaseInstace.from(table_name).upsert(dataToInsert);

    const { data: responseData, error, statusText } = await query.select();

    response = responseData;
    if (error) {
      response = statusText;
    }

    return { data: response, error };
  };

  /**
   * @description Deletes data from a Supabase table
   * @param id The id of the record to delete. (For 'ai_db_table' table, this is the `name` column)
   * @param table_name The Supabase table name
   * @returns The Supabase response
   */
  readonly deleteData = async (params: {
    table_name: SupabaseDBNames;
    ids: string[];
  }) => {
    const { table_name, ids } = params;
    let response: string | null;

    const query = this.supabaseInstace.from(table_name).delete();

    if (table_name === 'ai_db_table') {
      query.in('name', ids);
    } else {
      query.in('id', ids);
    }

    const { error } = await query;

    response = `Deleted ${ids.length} records from '${table_name}' table`;
    if (error) {
      this.log('deleteData - Error', error);
      response = null;
    }

    return { data: response, error: error?.message || null };
  };

  /**
   * The static method that controls access to the singleton instance. This implementation let you subclass the Singleton class while keeping just one instance of each subclass around.
   * @param verbose Whether to log messages or not
   * @returns The singleton instance
   */
  static getInstance(verbose?: boolean): SupabaseConnection {
    if (!SupabaseConnection.instance) {
      SupabaseConnection.instance = new SupabaseConnection(verbose);
    }

    return SupabaseConnection.instance;
  }

  /**
   * Executes a SQL query using the Supabase client pool.
   * @param query - The SQL query to execute.
   * @returns An object containing the query result data or error message.
   */
  private runSQL = async (query: string) => {
    const client = await this.pool.connect();
    try {
      const res = await client.query(query);
      return { data: res, error: null };
    } catch (error: any) {
      this.log('runSQL - Error', error, true);
      return { error: error.message, data: null };
    } finally {
      client.release();
    }
  };

  /**
   * Returns an object containing the SQL queries for creating the necessary tables and extensions in the Supabase database.
   * @returns An object with the SQL queries for creating the necessary tables and extensions in the Supabase database.
   */
  private getQueries = () => {
    // 1. Create extension query
    const extensionQuery = `CREATE EXTENSION IF NOT EXISTS vector`;

    // 2. Create tables queries
    const aiDBTableQuery = `CREATE TABLE IF NOT EXISTS public.ai_db_table (
      id UUID NOT NULL DEFAULT gen_random_uuid(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      description TEXT NULL,
      name TEXT NOT NULL,
      PRIMARY KEY (id),
      UNIQUE (name));
      
      ALTER TABLE public.ai_db_table ENABLE ROW LEVEL SECURITY;`;

    const dataChunkTableQuery = `CREATE TABLE IF NOT EXISTS public.ai_db_data_chunk (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    formatted_data TEXT NOT NULL,
    summary TEXT NOT NULL,
    ai_table_name TEXT NOT NULL,
    tokens INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (ai_table_name) REFERENCES ai_db_table (name) ON DELETE CASCADE);
    
    ALTER TABLE public.ai_db_data_chunk ENABLE ROW LEVEL SECURITY;`;

    const dataTableQuery = `CREATE TABLE IF NOT EXISTS public.ai_db_data (
      id UUID NOT NULL DEFAULT gen_random_uuid(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      data JSONB NOT NULL,
      data_chunk UUID NOT NULL,
      ai_table_name TEXT NOT NULL,
      embedding VECTOR NOT NULL,
      tokens INTEGER NOT NULL,
      formatted_data TEXT NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (ai_table_name) REFERENCES ai_db_table (name) ON DELETE CASCADE,
      FOREIGN KEY (data_chunk) REFERENCES ai_db_data_chunk (id) ON DELETE CASCADE);
      
      ALTER TABLE public.ai_db_data ENABLE ROW LEVEL SECURITY;`;

    return {
      extension: extensionQuery,
      aiDBTable: aiDBTableQuery,
      dataChunkTable: dataChunkTableQuery,
      dataTable: dataTableQuery,
    };
  };

  /**
   * Sets up the Supabase database by executing several queries to create the necessary tables and extensions.
   * @returns An object containing messages indicating whether the extension and tables were created successfully.
   * @throws An error if any of the queries fail to execute.
   */
  public setupDB = async () => {
    try {
      // 1. Get quereis
      const queries = this.getQueries();

      // 2. Execute extension query
      const extension = await this.runSQL(queries.extension);

      if (extension.error) {
        const errorMsg = `Error creating 'vector' extension: ${
          extension.error.message || extension.error
        }`;
        throw new Error(errorMsg);
      }

      // 3. Execute ai_db_table query
      const aiDBTable = await this.runSQL(queries.aiDBTable);

      if (aiDBTable.error) {
        const errorMsg = `Error creating 'ai_db_table' table: ${
          aiDBTable.error.message || aiDBTable.error
        }`;
        throw new Error(errorMsg);
      }

      // 4. Execute ai_db_data_chunk query
      const dataChunkTable = await this.runSQL(queries.dataChunkTable);

      if (dataChunkTable.error) {
        const errorMsg = `Error creating 'ai_db_data_chunk' table: ${
          dataChunkTable.error.message || dataChunkTable.error
        }`;
        throw new Error(errorMsg);
      }

      // 5. Execute ai_db_data query
      const dataTable = await this.runSQL(queries.dataTable);

      if (dataTable.error) {
        const errorMsg = `Error creating 'ai_db_data' table: ${
          dataTable.error.message || dataTable.error
        }`;
        throw new Error(errorMsg);
      }

      const extensionMsg = `Extension 'vector' created (if it didn't exist)`;
      const tablesMsg = `Tables 'ai_db_table', 'ai_db_data_chunk' and 'ai_db_data' created (if they didn't exist)`;

      return { extension: extensionMsg, tables: tablesMsg };
    } catch (error: any) {
      throw new Error(error.message || error);
    }
  };
}
