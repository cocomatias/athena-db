import {
  DataWithTokens,
  DataChunkInsert,
  DataInsert,
  GPTModelName,
  SupabaseData,
  SupabaseDBNames,
  SupabaseDataChunk,
  SupabaseDataWithTokens,
  DataUpdate,
} from '@types';
import { BaseClass } from '@utils/BaseClass';
import { SupabaseConnection } from './SupabaseConnection';
import { groupDataByTokens } from '@utils/groupDataByTokens';
import { getTokensLimit } from '@utils/getTokensLimit';
import { getStringFromObject } from '@utils/getStringFromObject';
import { getTokens } from '@utils/getTokens';
import { PostgrestError } from '@supabase/supabase-js';

type DataManagerParams = {
  verbose?: boolean;
};

type DataUpdatesParams = { data: DataUpdate; id: string };
type CreateDataChunkParams = {
  data: SupabaseDataWithTokens[];
  ai_table_name: string;
};

type CreatedDataChunk = {
  data: SupabaseData[];
  dataChunk: SupabaseDataChunk;
};

export class DataManager extends BaseClass {
  private model: GPTModelName = GPTModelName.GPT316k;
  private dataChunkTableName: SupabaseDBNames = 'ai_db_data_chunk';
  private dataTableName: SupabaseDBNames = 'ai_db_data';
  //   private tokensLimit = getTokensLimit(this.model);
  private tokensLimit = 200;
  private supabase = new SupabaseConnection(this.verbose);
  constructor({ verbose }: DataManagerParams) {
    super({ verbose });
  }

  public createDataWithTokens = async (params: SupabaseData[] | null) => {
    try {
      const dataWithTokens: SupabaseDataWithTokens[] = [];

      if (params) {
        for (let i = 0; i < params.length; i++) {
          const supabaseData = params[i];
          const tokens = await getTokens(
            getStringFromObject(supabaseData.data),
          );
          dataWithTokens.push({
            ...supabaseData,
            tokens,
          });
        }
      }

      return dataWithTokens;
    } catch (error: any) {
      this.log('createDataWithTokens - Error', error);
      throw new Error(error.message || error);
    }
  };

  public addData = async (params: {
    data: DataInsert['data'][];
    ai_table_name: DataInsert['ai_table_name'];
  }) => {
    try {
      // 1. Get table data
      const {
        data: supabaseData,
        error: supabaseDataError,
      }: { data: SupabaseData[] | null; error: string | null } =
        await this.supabase.getData({
          table_name: this.dataTableName,
          ai_table_name: params.ai_table_name,
        });

      if (supabaseDataError) {
        throw new Error(supabaseDataError);
      }

      // 2. Check if the table exists.
      if (!supabaseData?.length) {
        const table = await this.supabase.getData({
          table_name: 'ai_db_table',
          ai_table_name: params.ai_table_name,
        });

        if (!table.data?.length) {
          throw new Error(
            `Table ${params.ai_table_name} does not exist. Create it first.`,
          );
        }
      }

      // 3. Create the New Data in Supabase
      const dbDataToInsert: DataInsert[] = params.data.map(
        (d): DataInsert => ({
          data: d,
          ai_table_name: params.ai_table_name,
        }),
      );
      const {
        data: newSupabaseData,
        error: newSuapbaseDataError,
      }: { data: SupabaseData[]; error: PostgrestError | null } =
        await this.supabase.insertData({
          table_name: this.dataTableName,
          data: dbDataToInsert,
        });

      if (newSuapbaseDataError) {
        throw newSuapbaseDataError;
      }

      // 4. Create data with tokens
      const supabaseDataWithTokens = await this.createDataWithTokens(
        newSupabaseData,
      );
      const newSupabaseDataWithTokens = await this.createDataWithTokens(
        supabaseData,
      );
      const allDataWithTokens: SupabaseDataWithTokens[] = [
        ...supabaseDataWithTokens,
        ...newSupabaseDataWithTokens,
      ];

      const totalTokens = allDataWithTokens.reduce(
        (acc, curr) => acc + curr.tokens,
        0,
      );

      const groupedData = groupDataByTokens({
        data: allDataWithTokens,
        tokensLimit: this.tokensLimit,
      }) as SupabaseDataWithTokens[][];

      return { groupedData, totalTokens };
    } catch (error: any) {
      this.log('addData - Error', error);
      throw new Error(error.message || error);
    }
  };

  private updateSupabaseData = async (dataUpdates: DataUpdatesParams[]) => {
    try {
      const updatePromises = dataUpdates.map(async (dataUpdate) => {
        const { data: singleUpdatedData, error: updatedDataError } =
          await this.supabase.updateData({
            table_name: this.dataTableName,
            data: dataUpdate.data,
            id: dataUpdate.id,
          });

        if (updatedDataError) {
          throw updatedDataError;
        }

        return singleUpdatedData?.[0] as SupabaseData;
      });

      const updatedData = await Promise.all(updatePromises);

      return updatedData;
    } catch (error: any) {
      this.log('updateSupabaseData - Error', error);
      throw new Error(error.message || error);
    }
  };

  private createDataChunkObjects = async (params: CreateDataChunkParams) => {
    const { data, ai_table_name } = params;
    // 1. Group data by tokens
    const groupedData = groupDataByTokens({
      data: data,
      tokensLimit: this.tokensLimit,
    }) as SupabaseDataWithTokens[][];

    // 2. Create the data chunks
    const newDataChunks: { data: DataChunkInsert; ids: string[] }[] = [];

    for (let i = 0; i < groupedData.length; i++) {
      const dataChunk = groupedData[i];
      const summary = '';
      const formattedData = dataChunk
        .map((d) => getStringFromObject(d.data))
        .join('\n\n');

      newDataChunks.push({
        data: {
          formattedData,
          summary,
          ai_table_name,
        },
        ids: dataChunk.map((d) => d.id),
      });
    }

    return newDataChunks;
  };

  public createDataChunks = async (params: CreateDataChunkParams) => {
    try {
      // 1. Create data chunk objects
      const newDataChunks = await this.createDataChunkObjects(params);
      const response: CreatedDataChunk[] = [];

      // 3. Create the data chunks in Supabase
      for (let i = 0; i < newDataChunks.length; i++) {
        const newDataChunk = newDataChunks[i];
        const {
          data,
          error: supabaseDataChunkError,
        }: {
          data: SupabaseDataChunk[];
          error: PostgrestError | null;
        } = await this.supabase.insertData({
          table_name: this.dataChunkTableName,
          data: [newDataChunk.data],
        });

        if (supabaseDataChunkError) {
          throw supabaseDataChunkError;
        }

        // 4. Assign the data chunks ids to the data and update the data in Supabase
        const supabaseDataChunk = data[0];

        const dataChunkId = supabaseDataChunk.id;
        const dataIds = newDataChunk.ids;
        const dataUpdates: DataUpdatesParams[] = dataIds.map((id) => ({
          data: { data_chunk: dataChunkId } as DataUpdate,
          id,
        }));
        const updatedData: SupabaseData[] = await this.updateSupabaseData(
          dataUpdates,
        );

        response.push({ data: updatedData, dataChunk: supabaseDataChunk }); // Add all the data to the response
      }

      return response;
    } catch (error: any) {
      this.log('createDataChunk - Error', error);
      throw new Error(error.message || error);
    }
  };
}
