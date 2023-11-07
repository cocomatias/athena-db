import {
  AIDBTableInsert,
  AddDataParams,
  SupabaseAIDBTable,
  SupabaseDBNames,
  SupabaseGetDataResponse,
  GroupedDataObject,
  DefaultClassParams,
  AssignedDataChunk,
} from '@types';
import { BaseClass } from '@utils/BaseClass';
import { DataChunks } from './DataChunks';
import { Data } from './Data';
import { SupabaseConnection } from './SupabaseConnection';

type DataManagerAddParams = {
  data: AddDataParams[];
  createAITableIfNotExists?: boolean;
};

export class DataManager extends BaseClass {
  private dataChunks = new DataChunks({ verbose: this.verbose });
  private data = new Data({ verbose: this.verbose });
  private supabaseAITableName: SupabaseDBNames = 'ai_db_table';
  private totalUsage = 0;
  private totalCost = 0;

  constructor(params: DefaultClassParams) {
    super(params);
  }

  /**
   * @param data The data to extract the ai_table_name from
   * @param createAITableIfNotExists If true, create the ai_table_name if it does not exist
   * @description Checks if all the ai_table_name from the given data exists. If createAITableIfNotExists is true, create the ai_table_name if it does not exist.
   * @returns `true` if all the ai_table_name exists. Otherwise, throw an error.
   */
  public checkAITableNames = async (params: DataManagerAddParams) => {
    const { data, createAITableIfNotExists } = params;
    this.log(
      'add',
      `Checking if all the ai_table_name from the given data exists...`,
    );
    const aiTableNames = [...new Set(data.map((d) => d.ai_table_name))];
    const supabaseResponse: SupabaseGetDataResponse<SupabaseAIDBTable> =
      await this.supabase.getData({
        table_name: this.supabaseAITableName,
        ai_table_name: aiTableNames,
      });

    if (supabaseResponse.error) {
      const errorMsg = `Error checking if all the ai_table_name from the given data exists.\n\n${supabaseResponse.error}`;
      throw new Error(errorMsg);
    }

    const nonExistingAITableNames = aiTableNames
      .filter(
        (aiTableName) =>
          !supabaseResponse.data?.find((t) => t.name === aiTableName),
      )
      .map((ai_table_name) => ({ ai_table_name }));

    if (nonExistingAITableNames.length) {
      // If createAITableIfNotExists is false, throw an error
      if (!createAITableIfNotExists) {
        throw new Error(
          `The following AI table names do not exist: ${nonExistingAITableNames
            .map((c) => c.ai_table_name)
            .join(', ')}`,
        );
      }

      // If createAITableIfNotExists is true, create the AI table names
      this.log(
        'add',
        `Creating the following AI table names: ${nonExistingAITableNames
          .map((c) => c.ai_table_name)
          .join(', ')}`,
      );
      const newAITableInsertData: AIDBTableInsert[] =
        nonExistingAITableNames.map((c) => ({
          name: c.ai_table_name,
        }));

      const newAITableSupabaseRequest = await this.supabase.insertData({
        table_name: this.supabaseAITableName,
        data: newAITableInsertData,
      });

      if (newAITableSupabaseRequest.error) {
        const errorMsg =
          newAITableSupabaseRequest.error.message ||
          `Error creating the following AI table names: ${nonExistingAITableNames
            .map((c) => c.ai_table_name)
            .join(', ')}`;
        throw new Error(errorMsg);
      }
    }

    return true;
  };

  public assignDataChunks = async (params: { data: GroupedDataObject[] }) => {
    const { data } = params;
    const dataChunksTokensLimit = await this.dataChunks.getTokensLimit();
    // 1. Get the data chunks based on the ai_table_name
    this.log(
      'assignDataChunks',
      `Getting data chunks based on the ai_table_name...`,
    );
    const aiTableNames = [...new Set(data.map((d) => d.ai_table_name))];
    const supabaseDataChunks = await this.dataChunks.get({
      ai_table_name: aiTableNames,
      tokensAscending: true,
    });

    if (supabaseDataChunks.error) {
      throw new Error(supabaseDataChunks.error);
    }

    // 2. Assign the data to the data chunks
    const existingDataChunks: AssignedDataChunk[] =
      supabaseDataChunks.data?.map((d) => ({
        data_chunk_id: d.id,
        ai_table_name: d.ai_table_name,
        data: [],
        tokens: d.tokens,
        formatted_data: d.formatted_data,
      })) || [];

    data.forEach((d) => {
      const { data: dataInserts } = d;

      dataInserts.forEach((dataInsert) => {
        let chunk = existingDataChunks.find(
          (chunk) =>
            chunk.ai_table_name === dataInsert.ai_table_name &&
            chunk.tokens + dataInsert.tokens <= dataChunksTokensLimit,
        );

        // If no suitable chunk is found, create a new one without chunk_id and formatted_data, representing a new data chunk
        if (!chunk) {
          const newDataChunk: AssignedDataChunk = {
            ai_table_name: dataInsert.ai_table_name,
            data: [],
            tokens: 0,
            formatted_data: '',
          };

          existingDataChunks.push(newDataChunk);
          chunk = newDataChunk;
        }

        // Add the formatted_data to the chunk
        chunk.formatted_data = `${chunk.formatted_data || ''}${
          chunk.formatted_data ? '\n\n' : ''
        }${dataInsert.formatted_data}`;

        // Add the dataInsert to the chunk
        chunk.data.push(dataInsert);

        // Update the total token count for this chunk. And Add 2 tokens for the new line
        chunk.tokens += dataInsert.tokens + 2;
      });
    });

    return existingDataChunks.filter((d) => d.data.length);
  };

  public processAssignedDataChunks = async (params: {
    data: AssignedDataChunk[];
  }) => {
    const { data } = params;
    try {
      // 1. Filter existing and not existing data chunks
      const dataChunksUpdates = data.filter((d) => d.data_chunk_id);
      const newDataChunks = data.filter((d) => !d.data_chunk_id);

      // 2. Create new data chunks

      // return dataChunks;
    } catch (error: any) {
      this.log(
        'processAssignedDataChunks - Error',
        error.message || error,
        true,
      );
      throw new Error(error.message || error);
    }
  };

  /**
   * @param data The data to add and create data chunks from
   * @param createAITableIfNotExists If true, create the ai_table_name if it does not exist
   * @returns The data chunks
   */
  public add = async (params: DataManagerAddParams) => {
    const { data } = params;

    try {
      // 1. Check if all the ai_table_name exists
      await this.checkAITableNames(params);

      // 2. Create Data Objects
      const dataObjectsPromises = data.map(async (d) => {
        const { data, usage, cost } = await this.data.createDataObject(d);
        this.totalCost += cost;
        this.totalUsage += usage;
        return data;
      });

      this.log('add', `Creating ${data.length} data objects...`);
      const dataObjects = (await Promise.all(dataObjectsPromises)).flat();
      this.log(
        'add',
        `Created ${dataObjects.length} data objects.\n\nTotal Cost: ${this.totalCost}\nTotal Usage: ${this.totalUsage}`,
      );

      // 3. Group Data Objects by ai_table_name
      const groupedDataObjects =
        this.data.groupDataObjectsByAiTableName(dataObjects);

      // 4. Assign Data Chunks
      const dataChunks = await this.assignDataChunks({
        data: groupedDataObjects,
      });

      return dataChunks;
    } catch (error: any) {
      this.log('add - Error', error.message || error, true);
      throw new Error(error.message || error);
    }
  };
}
