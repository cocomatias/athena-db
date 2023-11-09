// Types
import {
  AIDBTableInsert,
  AddDataParams,
  SupabaseAIDBTable,
  SupabaseDBNames,
  SupabaseGetDataResponse,
  GroupedDataObject,
  DefaultClassParams,
  AssignedDataChunk,
  SupabaseData,
  SupabaseDataChunk,
} from '@types';
// Utils
import { BaseClass } from '@utils/BaseClass';
import { DataChunks } from './DataChunks';
import { Data } from './Data';
import { AIDBTable } from './AIDBTable';

type DataManagerAddParams = {
  data: AddDataParams[];
  createAITableIfNotExists?: boolean;
};

/**
 * Manages the interactions with data chunks and individual data items.
 */
export class DataManager extends BaseClass {
  // Private members for internal management of data chunks, data items, and Supabase interactions.
  private dataChunks = new DataChunks({ verbose: this.verbose });
  private data = new Data({ verbose: this.verbose });
  private supabaseAITableName: SupabaseDBNames = 'ai_db_table';
  private totalUsage = 0;
  private totalCost = 0;

  constructor(params: DefaultClassParams) {
    super(params);
  }

  /**
   * Checks the existence of AI table names in the database and optionally creates them if they don't exist.
   * @param params - An object containing the data to be added and a flag to create AI tables if they don't exist.
   * @param params.data - The array of data objects to be added, which includes ai_table_name for each item.
   * @param params.createAITableIfNotExists - A boolean flag that, when true, creates non-existing ai_table_name entries.
   * @returns A Promise that resolves to true if all AI tables exist or are created, otherwise throws an error.
   * @throws Will throw an error if any AI table name does not exist and the flag to create it is false.
   */
  readonly checkAITableNames = async (params: DataManagerAddParams) => {
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

  /**
   * Assigns data to appropriate chunks based on AI table names and tokens limits.
   * @param params - An object containing grouped data objects.
   * @param params.data - An array of GroupedDataObject instances to be assigned to chunks.
   * @returns A Promise that resolves to an array of assigned data chunks ready for further processing.
   * @throws Will throw an error if fetching data chunks from the database fails.
   */
  readonly assignDataChunks = async (params: { data: GroupedDataObject[] }) => {
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

  /**
   * Adds data items to the database, creating data chunks and AI tables if necessary.
   * @param params - Parameters for adding data, including the data and a flag to create AI tables.
   * @param params.data - The array of data items to add.
   * @param params.createAITableIfNotExists - When true, ensures that the AI tables are created if they don't exist.
   * @returns A Promise that resolves to an object containing the total cost, usage, data chunks, and processed data.
   * @throws Will throw an error if the process encounters any issues.
   */
  readonly add = async (params: DataManagerAddParams) => {
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
      const assignedDataChunks = await this.assignDataChunks({
        data: groupedDataObjects,
      });

      // 5. Process Assigned Data Chunks
      const processedDataChunks =
        await this.dataChunks.processAssignedDataChunks({
          data: assignedDataChunks,
        });

      this.totalCost += processedDataChunks.cost;
      this.totalUsage += processedDataChunks.usage;

      // 6. Create new Datas
      const proccesedData = await this.data.processProcessedDataChunks({
        data: [...processedDataChunks.new, ...processedDataChunks.updated],
      });

      return {
        cost: this.totalCost,
        usage: this.totalUsage,
        dataChunks: processedDataChunks,
        data: proccesedData,
      };
    } catch (error: any) {
      this.log('add - Error', error.message || error, true);
      throw new Error(error.message || error);
    }
  };

  readonly delete = async ({
    data_ids,
    ai_table_name,
  }: {
    data_ids?: string[];
    ai_table_name?: string;
  }) => {
    try {
      if (!data_ids && !ai_table_name) {
        throw new Error(
          `You must provide either data_ids or ai_table_name param`,
        );
      }

      // If ai_table_name is provided, remove the DataChunk directly
      if (ai_table_name) {
        const deleteAITableMessage = await new AIDBTable({
          verbose: this.verbose,
        }).delete(ai_table_name);

        return deleteAITableMessage;
      }

      const updateDataChunkIds: string[] = [];
      const dataFromDataChunks: SupabaseData[] = [];

      // 1. Get the data and the data_chunk ids of the data to be deleted
      try {
        this.log('delete', `Getting the data to be deleted...`);
        const gettedData = await this.data.getData({
          ids: data_ids,
        });

        if (gettedData?.length) {
          gettedData.map((d) => {
            d.data_chunk && updateDataChunkIds.push(d.data_chunk);
          });
        }
      } catch (error: any) {
        const errorMsg = error.message
          ? `Error getting the data to be deleted.\n\n${error.message}`
          : error;

        throw new Error(errorMsg);
      }

      // 2. Create AssignedDataChunks & Update the DataChunks
      try {
        this.log('delete', `Updating the data chunks...`);
        // Get the data that it's not going to be deleted
        const dataFromDataChunksPromises = updateDataChunkIds.map(
          async (id) => {
            const data = (
              await this.data.getData({ data_chunk_id: id })
            )?.filter((d) => !data_ids?.includes(d.id));
            dataFromDataChunks.push(...(data || []));
          },
        );

        await Promise.all(dataFromDataChunksPromises);
      } catch (error: any) {
        const errorMsg = error.message
          ? `Error updating the data chunks.\n\n${error.message}`
          : error;

        throw new Error(errorMsg);
      }

      // 3. Group the data by data_chunk_id
      const groupedDataFromDataChunksObjects = dataFromDataChunks.reduce(
        (acc, data) => {
          if (data.data_chunk) {
            acc[data.data_chunk] = acc[data.data_chunk] || [];
            acc[data.data_chunk].push(data);
          }
          return acc;
        },
        {} as { [key: string]: SupabaseData[] },
      );

      const groupedDataFromDataChunks = Object.keys(
        groupedDataFromDataChunksObjects,
      ).map((key) => ({
        data_chunk_id: key,
        data: groupedDataFromDataChunksObjects[key],
      }));

      // 4. Create the DataChunk updates array
      const dataChunkUpdates: AssignedDataChunk[] =
        groupedDataFromDataChunks.map((d) => {
          const newLinesTokens = d.data.length * 2; // Add 2 tokens for every new line
          const formatted_data = d.data
            .map((d) => d.formatted_data)
            .join('\n\n');
          const tokens = d.data.reduce(
            (acc, d) => acc + d.tokens,
            newLinesTokens,
          );
          return {
            data_chunk_id: d.data_chunk_id,
            ai_table_name: d.data[0].ai_table_name, // All the data in the same data chunk have the same ai_table_name
            data: d.data,
            formatted_data,
            tokens,
          };
        });

      // 5. Now we can delete the data
      try {
        this.log('delete', `Deleting the data...`);
        await this.data.deleteData({ ids: data_ids });
      } catch (error: any) {
        const errorMsg = error.message
          ? `Error deleting the data: ${error.message}`
          : error;

        throw new Error(errorMsg);
      }

      const supabaseDataChunkUpdates: SupabaseDataChunk[] = [];

      // 6. Update the data chunks to add the not deleted data
      try {
        this.log('delete', `Updating the data chunks...`);
        const dataChunksUpdatesPromises = dataChunkUpdates.map(
          async (dataChunkUpdate) => {
            return await this.dataChunks.update({
              data: dataChunkUpdate,
            });
          },
        );

        (await Promise.all(dataChunksUpdatesPromises)).map((d) => {
          if (d) {
            supabaseDataChunkUpdates.push(d);
          }
        });

        this.log(
          'delete',
          `Updated ${supabaseDataChunkUpdates.length} data chunks.`,
        );
      } catch (error: any) {
        const errorMsg = error.message
          ? `Error updating the data chunks: ${error.message}`
          : error;

        throw new Error(errorMsg);
      }

      return supabaseDataChunkUpdates;
    } catch (error: any) {
      this.log('delete - Error', error.message || error, true);
      throw new Error(error.message || error);
    }
  };
}
