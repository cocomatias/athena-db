import {
  DataInsert,
  DefaultClassParams,
  GroupedDataObject,
  SupabaseDBNames,
  SupabaseData,
  SupabaseGetDataResponse,
} from '@types';
import { BaseClass } from '@utils/BaseClass';
import { getStringFromObject } from '@utils/getStringFromObject';
import { getTokens } from '@utils/getTokens';
import { OpenAIEmbeddings } from './OpenAIEmbeddings';
import { DataChunks } from './DataChunks';
import { SupabaseConnection } from './SupabaseConnection';

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

  constructor(params: DefaultClassParams) {
    super(params);
  }

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
   * Splits the formatted data into two chunks with a specified number of overlapping words.
   *
   * @param params - The parameters including the text to be split, token count, and overlap word count.
   * @returns A promise that resolves to an array of data chunks with token counts.
   */
  public splitData = async (
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
  public createDataObject = async (
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
        data,
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

  public getData = async (params: {
    data_chunk_id?: string;
    ai_table_name?: string;
  }) => {
    const { data_chunk_id, ai_table_name } = params;

    try {
      const data: SupabaseGetDataResponse<SupabaseData> =
        await this.supabase.getData({
          table_name: this.supabaseDBName,
          data_chunk_id,
          ai_table_name,
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
}
