// Vendors
import express, { Request, Response, Router } from 'express';
// Utils
import BaseRoute from '@utils/api/BaseRoute';
import { OpenAIChatCompletion } from '@utils/api/OpenAIChatCompletion';
// Types
import { DataWithTokens, DataInsert, GPTModelName } from '@types';
// import { groupDataByTokens } from '@utils/groupDataByTokens';
import { SupabaseConnection } from '@utils/api/SupabaseConnection';
// import { getTokens } from '@utils/getTokens';
// import { getStringFromObject } from '@utils/getStringFromObject';
// import { niceLog } from '@utils/niceLog';
import {
  // mockAssignedDataChunk,
  mockDBBigDataWithoutTokens,
  mockDBDataWithoutTokens,
  // mockGroupedDataObjects,
  // mockGroupedSupabaseAIDBData,
} from '@utils/mockData';
// import { OpenAIEmbeddings } from '@utils/api/OpenAIEmbeddings';
import { DataChunks } from '@utils/api/DataChunks';
import { DataManager } from '@utils/api/DataManager';
// import { Data } from '@utils/api/Data';

const router = Router();
// Parse JSON bodies (as sent by API clients)
router.use(express.json());

class TestRoute extends BaseRoute {
  execute = async () => {
    const sb = SupabaseConnection.getInstance(true);

    // Create Test AI Table
    // const createTable = await sb.insertData({
    //   table_name: 'ai_db_table',
    //   data: [
    //     {
    //       name: 'test1',
    //     },
    //   ],
    // });
    // this.returnResponse(createTable);

    // Test Delete AI Table
    // const deleteData = await sb.deleteData({
    //   table_name: 'ai_db_table',
    //   id: ['test1'],
    // });
    // this.returnResponse(deleteData);

    // Test Get DB Data
    // const supabaseDBData = await sb.getData({
    //   table_name: 'ai_db_data',
    //   ai_table_name: 'test1',
    // });
    // this.returnResponse(supabaseDBData);

    // Test Get DataChunks
    const supabaseDataChunks = await sb.getData({
      table_name: 'ai_db_data_chunk',
      ai_table_name: 'test',
    });
    this.returnResponse(supabaseDataChunks);

    // Test Insert DB Data
    // const insertedData = await sb.insertData({
    //   table_name: 'ai_db_data',
    //   data: dbData,
    // });
    // this.returnResponse(insertedData);

    // Test addData method from DataManager
    // const newData: AddDataParams = {
    //   data: mockDBDataWithoutTokens,
    //   ai_table_name: 'test1',
    // };
    // const data = await dm.addData(newData);
    // this.returnResponse(data);

    // Test createDataChunk method from DataManager
    // const dataChunk = await dm.createDataChunks({
    //   data: mockGroupedSupabaseAIDBData.flat(),
    //   ai_table_name: 'test1',
    // });

    // this.returnResponse(dataChunk);
  };
}

class TestRoute2 extends BaseRoute {
  execute = async () => {
    const dm = new DataManager({ verbose: true });
    const dataTest = [
      {
        ai_table_name: 'test',
        data: mockDBDataWithoutTokens[0],
      },
      {
        ai_table_name: 'test',
        data: mockDBDataWithoutTokens[1],
      },
      {
        ai_table_name: 'test1',
        data: mockDBDataWithoutTokens[2],
      },
      {
        ai_table_name: 'test2',
        data: mockDBDataWithoutTokens[3],
      },
      {
        ai_table_name: 'test2',
        data: mockDBDataWithoutTokens[4],
      },
      {
        ai_table_name: 'test4',
        data: mockDBDataWithoutTokens[5],
      },
    ];

    const bigDataTest = [
      {
        ai_table_name: 'test',
        data: mockDBBigDataWithoutTokens[0],
      },
      {
        ai_table_name: 'test',
        data: mockDBBigDataWithoutTokens[1],
      },
      {
        ai_table_name: 'test',
        data: mockDBBigDataWithoutTokens[2],
      },
    ];
    const test = await new DataManager({ verbose: true }).add({
      data: bigDataTest,
    });
    // const test = await new Data({ verbose: true }).splitData({
    //   formatted_data: mockDBBigDataWithoutTokens[0],
    //   tokens: 11999,
    // });

    // const test = {
    //   tokensLimit: await new DataChunks({ verbose: true }).getTokensLimit(),
    // };

    this.returnResponse(test);
  };
}

router.post('/test', (req: Request, res: Response) =>
  new TestRoute({ req, res, verbose: true, allowStreaming: false }).handle(),
);

router.post('/test2', (req: Request, res: Response) =>
  new TestRoute2({ req, res, verbose: true, allowStreaming: false }).handle(),
);

export default router;
