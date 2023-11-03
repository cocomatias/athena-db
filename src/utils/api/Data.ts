import { DataInsert, DefaultClassParams, GroupedDataObject } from '@types';
import { BaseClass } from '@utils/BaseClass';
import { getStringFromObject } from '@utils/getStringFromObject';
import { getTokens } from '@utils/getTokens';
import { OpenAIEmbeddings } from './OpenAIEmbeddings';
import { DataChunks } from './DataChunks';

type CreateDataObjectParams = {
  data: DataInsert['data'];
  ai_table_name: DataInsert['ai_table_name'];
  data_chunk?: string;
};

export class Data extends BaseClass {
  private dataChunksTokensLimit = new DataChunks({ verbose: this.verbose })
    .tokensLimit;
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
   * @description Creates a data object with the tokens, embedding, and formatted_data
   * @param data The data to create the data object from
   * @returns The data object with the tokens, embedding, and formatted_data. Also returns the usage and cost of the OpenAI API call
   */
  public createDataObject = async (data: CreateDataObjectParams) => {
    try {
      const formatted_data =
        typeof data.data === 'string'
          ? data.data
          : getStringFromObject(data.data);

      const aiTable = data.ai_table_name;
      const tokens = await getTokens(formatted_data);
      if (tokens > this.dataChunksTokensLimit) {
        throw new Error(
          `The data tokens (${tokens}) exceeds the tokens limit (${this.dataChunksTokensLimit})`,
        );
      }
      // TODO: Check how to embed data of more than 8k tokens
      // const embeddingData = await new OpenAIEmbeddings({
      //   verbose: this.verbose,
      //   text: formatted_data,
      // }).call();

      const dataToInsert: DataInsert = {
        tokens,
        ai_table_name: aiTable,
        data,
        formatted_data,
        embedding: [],
      };

      return {
        data: dataToInsert,
        usage: 0,
        cost: 0,
      };
    } catch (error: any) {
      this.log('createDataObject - Error', error.message || error, true);
      throw new Error(error.message || error);
    }
  };
}
