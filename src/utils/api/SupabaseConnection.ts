// Vendors
import {
  SupabaseClient,
  createClient,
  PostgrestError,
} from '@supabase/supabase-js';
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

  public getData = async (
    params: BaseQueryParams,
  ): Promise<SupabaseGetDataResponse<any>> => {
    const { table_name, ai_table_name, data_chunk_id } = params;

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
  public countData = async (params: BaseQueryParams) => {
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
      const errorMsg =
        pgError.message || `Error counting data for ${params.table_name}`;
      this.log('countData - Error', errorMsg);
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
  public insertData = async ({
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
  public updateData = async (params: SupabaseUpdateDataFunctionParams) => {
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
  public deleteData = async (params: {
    table_name: SupabaseDBNames;
    id: string[];
  }) => {
    const { table_name, id } = params;
    let response: string | null;

    const query = this.supabaseInstace.from(table_name).delete();

    if (table_name === 'ai_db_table') {
      query.in('name', id);
    } else {
      query.in('id', id);
    }

    const { error } = await query;

    response = `Deleted ${id.length} records from '${table_name}' table`;
    if (error) {
      this.log('deleteData - Error', error);
      response = null;
    }

    return { data: response, error: error?.message || null };
  };

  // The static method that controls access to the singleton instance.
  public static getInstance(verbose?: boolean): SupabaseConnection {
    if (!SupabaseConnection.instance) {
      SupabaseConnection.instance = new SupabaseConnection(verbose);
    }

    return SupabaseConnection.instance;
  }
}
