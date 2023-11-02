import {
  AIDBTableInsert,
  AddDataParams,
  DataInsert,
  SupabaseAIDBTable,
  SupabaseDBNames,
  SupabaseGetDataResponse,
  GroupedDataObject,
  SupabaseDataChunk,
} from '@types';
import { BaseClass } from '@utils/BaseClass';
import { SupabaseConnection } from './SupabaseConnection';
import { DataChunks } from './DataChunks';
import { getTokens } from '@utils/getTokens';
import { getStringFromObject } from '@utils/getStringFromObject';
import { OpenAIEmbeddings } from './OpenAIEmbeddings';

type DataManagerParams = {
  verbose?: boolean;
};

type DataToInsertInDataChunk = {
  data_chunk_id?: string; // If the data chunk is new, this will be undefined
  formatted_data?: string; // If the data chunk is new, this will be undefined
  ai_table_name: string;
  data: DataInsert[];
  tokens: number;
};

type DataManagerAddParams = {
  data: AddDataParams[];
  createAITableIfNotExists?: boolean;
};

export class DataManager extends BaseClass {
  private supabase = new SupabaseConnection(this.verbose);
  private dataChunks = new DataChunks({ verbose: this.verbose });
  private dataChunksTokensLimit = this.dataChunks.tokensLimit;
  private supabaseAITableName: SupabaseDBNames = 'ai_db_table';
  private totalUsage = 0;
  private totalCost = 0;

  constructor(params: DataManagerParams) {
    super(params);
  }

  /**
   * @description Creates a data object with the tokens, embedding, and formatted_data
   * @param data The data to create the data object from
   * @returns The data object
   */
  public createDataObject = async (data: AddDataParams) => {
    const formatted_data = getStringFromObject(data.data);
    const aiTable = data.ai_table_name;
    const tokens = await getTokens(formatted_data);
    const embeddingData = await new OpenAIEmbeddings({
      verbose: this.verbose,
      text: formatted_data,
    }).call();

    this.totalCost += Number(embeddingData.cost);
    this.totalUsage += Number(embeddingData.usage.total_tokens);

    const dataToInsert: DataInsert = {
      tokens,
      ai_table_name: aiTable,
      data,
      formatted_data,
      embedding: embeddingData.data,
    };

    return dataToInsert;
  };

  /**
   * @description Groups data objects by their ai_table_name
   * @param params Array of DataInsert objects
   * @returns An array of grouped data objects
   */
  public groupDataObjectsByAiTableName(
    params: DataInsert[],
  ): GroupedDataObject[] {
    return params.reduce((result, param) => {
      const { ai_table_name } = param;

      // Find an existing group for the ai_table_name
      let group = result.find((g) => g.ai_table_name === ai_table_name);

      // If the group doesn't exist, create a new one
      if (!group) {
        group = { ai_table_name, data: [] };
        result.push(group);
      }

      // Add the current param to the group's data
      group.data.push(param);

      return result;
    }, [] as GroupedDataObject[]);
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

    const existingDataChunks: DataToInsertInDataChunk[] =
      supabaseDataChunks.data?.map((d) => ({
        data_chunk_id: d.id,
        ai_table_name: d.ai_table_name,
        data: [],
        tokens: d.tokens,
        formatted_data: d.formattedData,
      })) || [];

    data.forEach((d) => {
      const { data: dataInserts, ai_table_name } = d;

      dataInserts.forEach((dataInsert) => {
        let chunk = existingDataChunks.find(
          (chunk) =>
            chunk.ai_table_name === dataInsert.ai_table_name &&
            chunk.tokens + dataInsert.tokens <= this.dataChunksTokensLimit,
        );

        if (!chunk) {
          // If no suitable chunk is found, create a new one.
          // You'll have to determine how to set the data_chunk_id
          const newDataChunk: DataToInsertInDataChunk = {
            ai_table_name: dataInsert.ai_table_name,
            data: [],
            tokens: 0,
          };

          existingDataChunks.push(newDataChunk);
          chunk = newDataChunk;
        }
        chunk.formatted_data =
          (chunk.formatted_data || '') + '\n\n' + dataInsert.formatted_data;

        // Add the dataInsert to the chunk
        chunk.data.push(dataInsert);

        // Update the total token count for this chunk. And Add 2 tokens for the new line
        chunk.tokens += dataInsert.tokens + 2;
      });
    });

    // 3. Create the data chunks

    // 4. Assign the data objects to the data chunks
    // 4.1

    return existingDataChunks;
  };

  public add = async (params: DataManagerAddParams) => {
    const { data } = params;

    try {
      // 1. Check if all the ai_table_name exists
      await this.checkAITableNames(params);

      // 2. Create Data Objects
      const dataObjectsPromises = data.map(
        async (d) => await this.createDataObject(d),
      );

      this.log('add', `Creating ${data.length} data objects...`);
      const dataObjects = await Promise.all(dataObjectsPromises);
      this.log(
        'add',
        `Created ${dataObjects.length} data objects.\n\nTotal Cost: ${this.totalCost}\nTotal Usage: ${this.totalUsage}`,
      );

      // 3. Group Data Objects by ai_table_name
      const groupedDataObjects =
        this.groupDataObjectsByAiTableName(dataObjects);

      return groupedDataObjects;
    } catch (error: any) {
      this.log('add - Error', error.message || error, true);
      throw new Error(error.message || error);
    }
  };
}
