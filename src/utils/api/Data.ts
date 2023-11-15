// Utils
import { BaseClass } from '@utils/BaseClass';
import { getStringFromObject } from '@utils/getStringFromObject';
import { getTokens } from '@utils/getTokens';
import { OpenAIEmbeddings } from './OpenAIEmbeddings';
import { DataChunks } from './DataChunks';
// Types
import {
  DataInsert,
  DefaultClassParams,
  GroupedDataObject,
  ProcessedDataChunk,
  SupabaseDBNames,
  SupabaseData,
  SupabaseGetDataResponse,
} from '@types';

type CreateDataObjectParams = {
  data: DataInsert['data'];
  ai_table_name: DataInsert['ai_table_name'];
  data_chunk?: string;
};

type CreateDataObjectReturn = {
  data: DataInsert[];
  usage: number;
  cost: number;
};

type SplitDataParams = {
  formatted_data: string;
  tokens: number;
  overlap?: number;
};

type SplittedData = {
  data: string;
  tokens: number;
};

type GetDataParams = {
  data_chunk_id?: string;
  ai_table_name?: string;
  ids?: string[];
  tokensAscending?: boolean;
};

export class Data extends BaseClass {
  private _dataChunks?: DataChunks;
  private dataTokensLimit = new OpenAIEmbeddings({
    verbose: this.verbose,
    text: '',
  }).tokensLimit;
  private supabaseDBName: SupabaseDBNames = 'ai_db_data';

  // Lazy initializer for DataChunks
  private get dataChunks(): DataChunks {
    if (!this._dataChunks) {
      this._dataChunks = new DataChunks({ verbose: this.verbose });
    }
    return this._dataChunks;
  }

  constructor(params: DefaultClassParams = {}) {
    super(params);
  }

  /**
   * @description Groups data objects by their ai_table_name
   * @param params Array of DataInsert objects
   * @returns An array of grouped data objects
   */
  readonly groupDataObjectsByAiTableName = (
    params: DataInsert[],
  ): GroupedDataObject[] => {
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
  };

  /**
   * Splits the formatted data into two chunks with a specified number of overlapping words.
   *
   * @param params - The parameters including the text to be split, token count, and overlap word count.
   * @returns A promise that resolves to an array of data chunks with token counts.
   */
  readonly splitData = async (
    params: SplitDataParams,
  ): Promise<SplittedData[]> => {
    const { formatted_data, tokens } = params;
    const overlap = params.overlap || formatted_data.split(' ').length / 15;

    // If total tokens are within the limit, return the data as a single chunk.
    if (tokens <= this.dataTokensLimit) {
      return [{ data: formatted_data, tokens }];
    }

    // Split the text in half to find a base index for splitting into two chunks.
    let splitIndex = Math.floor(formatted_data.length / 2);

    // Adjust split index to be the end of a sentence if possible.
    splitIndex = formatted_data.lastIndexOf('.', splitIndex) + 1 || splitIndex;

    // Move back 'overlap' number of words from the splitIndex.
    let overlapStartIndex = splitIndex;
    for (let i = 0; i < overlap; i++) {
      overlapStartIndex = formatted_data.lastIndexOf(
        ' ',
        overlapStartIndex - 1,
      );
    }

    // Ensure we don't have a negative start index for the overlap and adjust to start after the space.
    overlapStartIndex = Math.max(0, overlapStartIndex + 1);

    // Extract the two chunks using the overlap start index.
    const firstChunkData = formatted_data.slice(0, splitIndex);
    const secondChunkData = formatted_data.slice(overlapStartIndex).trim();

    // Calculate the tokens for each chunk.
    const firstChunkTokens = await getTokens(firstChunkData);
    const secondChunkTokens = await getTokens(secondChunkData);

    return [
      {
        data: firstChunkData,
        tokens: firstChunkTokens,
      },
      {
        data: secondChunkData,
        tokens: secondChunkTokens,
      },
    ];
  };

  /**
   * @description Creates a data object with the tokens, embedding, and formatted_data
   * @param data The data to create the data object from
   * @returns The data object with the tokens, embedding, and formatted_data. Also returns the usage and cost of the OpenAI API call
   */
  readonly createDataObject = async (
    data: CreateDataObjectParams,
  ): Promise<CreateDataObjectReturn> => {
    const dataChunksTokensLimit = await this.dataChunks.getTokensLimit();

    try {
      const formatted_data =
        typeof data.data === 'string'
          ? data.data
          : getStringFromObject(data.data);

      const aiTable = data.ai_table_name;
      const tokens = await getTokens(formatted_data);
      if (tokens > dataChunksTokensLimit) {
        throw new Error(
          `The data tokens (${tokens}) exceeds the tokens limit (${dataChunksTokensLimit})`,
        );
      }

      // If data tokens exceeds the tokens limit, split the data into chunks and create a data object for each chunk
      if (tokens > this.dataTokensLimit) {
        const splittedData = await this.splitData({
          formatted_data,
          tokens,
        });

        const dataObjectsPromises = splittedData.map(async (dataChunk) => {
          const dataObject = await this.createDataObject({
            ai_table_name: aiTable,
            data_chunk: data.data_chunk,
            data: dataChunk.data,
          });

          return dataObject;
        });

        const dataObjects = await Promise.all(dataObjectsPromises);

        const datasToInsert: DataInsert[] = dataObjects.map((dataObject) => {
          return dataObject.data[0];
        });

        const totalUsage = dataObjects.reduce((acc, dataObject) => {
          return acc + dataObject.usage;
        }, 0);

        const totalCost = dataObjects.reduce((acc, dataObject) => {
          return acc + dataObject.cost;
        }, 0);

        return {
          data: datasToInsert,
          cost: totalCost,
          usage: totalUsage,
        };
      }
      const embeddingData = await new OpenAIEmbeddings({
        verbose: this.verbose,
        text: formatted_data,
      }).call();

      const dataToInsert: DataInsert = {
        tokens,
        ai_table_name: aiTable,
        data: data.data,
        formatted_data,
        embedding: embeddingData.data,
      };

      return {
        data: [dataToInsert],
        usage: embeddingData.usage.total_tokens,
        cost: parseFloat(embeddingData.cost),
      };
    } catch (error: any) {
      this.log('createDataObject - Error', error.message || error, true);
      throw new Error(error.message || error);
    }
  };

  /**
   * @description Gets the data from the database
   * @param params The parameters to get the data
   * @param params.data_chunk_id (optional) The data chunk ID to get the data from
   * @param params.ai_table_name (optional) The AI table name to get the data from
   * @param params.ids (optional) The Data IDs
   * @returns The data objects with the tokens, embedding, and formatted_data. Also returns the usage and cost of the OpenAI API call
   */
  readonly getData = async (params: GetDataParams) => {
    const { data_chunk_id, ai_table_name, ids, tokensAscending } = params;

    try {
      const data: SupabaseGetDataResponse<SupabaseData> =
        await this.supabase.getData({
          table_name: this.supabaseDBName,
          data_chunk_id,
          ai_table_name,
          ids,
          tokensAscending,
        });

      if (data.error) {
        throw new Error(data.error);
      }

      return data.data;
    } catch (error: any) {
      this.log('getData - Error', error.message || error, true);
      throw new Error(error.message || error);
    }
  };

  /**
   * Creates new data in the Supabase database.
   * @param params An object containing the data to be inserted and the data chunk ID.
   * @returns A promise that resolves to an array of SupabaseData objects representing the newly created data.
   * @throws An error if the given data does not have the same data chunk ID, or if there was an error inserting the data into the database.
   */
  readonly createData = async (params: {
    data: DataInsert[];
    data_chunk: string;
  }): Promise<SupabaseData[]> => {
    const { data, data_chunk } = params;
    try {
      // Check if all the given data has the same data_chunk
      data.map((d) => {
        if (d.data_chunk !== data_chunk) {
          throw new Error(
            `The given data does not have the same DataChunk ID\n\ndata_chunk: ${data_chunk}\ndata.data_chunk: ${d.data_chunk}`,
          );
        }
      });

      const { data: supabaseData, error } = await this.supabase.insertData({
        table_name: this.supabaseDBName,
        data,
      });

      if (error) {
        throw error;
      }

      this.log(
        'createData',
        `Created ${supabaseData.length} data for DataChunk ${data_chunk}`,
      );

      return supabaseData as SupabaseData[];
    } catch (error: any) {
      this.log('createData - Error', error.message || error, true);
      throw new Error(error.message || error);
    }
  };

  readonly processProcessedDataChunks = async (params: {
    data: ProcessedDataChunk[];
  }) => {
    const { data } = params;
    try {
      // 1. Check if all the data chunks exist
      data.map((d) => {
        if (!d.id) {
          throw new Error(`The given data chunk does not exist`);
        }
        return d;
      });

      // 2. Create Datas
      const dataPromises = data.map(async (d) => {
        const createdData = await this.createData({
          data: d.data,
          data_chunk: d.id!,
        });

        return createdData;
      });

      const createdData = (await Promise.all(dataPromises)).flat();

      this.sendMessage(`Created ${createdData.length} datas`);
      this.log(
        'processProcessedDataChunks',
        `Created ${createdData.length} data`,
      );

      return createdData as SupabaseData[];
    } catch (error: any) {
      this.log(
        'processAssignedDataChunks - Error',
        error.message || error,
        true,
      );
      throw new Error(error.message || error);
    }
  };

  readonly deleteData = async (params: GetDataParams) => {
    const { ids, data_chunk_id, ai_table_name } = params;
    try {
      let data_ids: string[] = [];
      // Check if any of the params are present
      if (!ids && !data_chunk_id && !ai_table_name) {
        throw new Error('Missing required params');
      }

      // Check if more than one param is present
      if (
        (ids && data_chunk_id) ||
        (ids && ai_table_name) ||
        (data_chunk_id && ai_table_name)
      ) {
        throw new Error('Only one param is allowed');
      }

      if (ids) {
        data_ids = ids;
      } else if (data_chunk_id || ai_table_name) {
        const data = await this.getData({ data_chunk_id, ai_table_name });
        if (data?.length) data_ids = data.map((d) => d.id);
      }

      if (!data_ids.length) {
        throw new Error('No data to delete');
      }

      const { error } = await this.supabase.deleteData({
        table_name: this.supabaseDBName,
        ids: data_ids,
      });

      if (error) {
        throw error;
      }

      const successMessage = `Deleted ${data_ids.length} data`;
      this.log('deleteData', successMessage);

      return successMessage;
    } catch (error: any) {
      this.log('deleteData - Error', error.message || error, true);
      throw new Error(error.message || error);
    }
  };
}
