// Vendors
import express, { Request, Response, Router } from 'express';
// Utils
import BaseRoute from '@utils/api/BaseRoute';
import { OpenAIChatCompletion } from '@utils/api/OpenAIChatCompletion';
// Types
import {
  DataWithTokens,
  DataInsert,
  AddDataParams,
  GPTModelName,
} from '@types';
import { groupDataByTokens } from '@utils/groupDataByTokens';
import { SupabaseConnection } from '@utils/api/SupabaseConnection';
import { DataManager } from '@utils/api/DataManager';
import { getTokens } from '@utils/getTokens';
import { getStringFromObject } from '@utils/getStringFromObject';
import { niceLog } from '@utils/niceLog';
import {
  mockDBDataWithoutTokens,
  mockGroupedSupabaseAIDBData,
} from '@utils/mockData';

const router = Router();
// Parse JSON bodies (as sent by API clients)
router.use(express.json());

class TestRoute extends BaseRoute {
  execute = async () => {
    const dbData: DataInsert[] = mockDBDataWithoutTokens.map((d) => ({
      data: d,
      ai_table_name: 'test1',
    }));

    const sb = new SupabaseConnection(true);
    const dm = new DataManager({ verbose: true });

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
    // const supabaseDataChunks = await sb.getData({
    //   table_name: 'ai_db_data_chunk',
    //   // ai_table_name: 'test1',
    // });
    // this.returnResponse(supabaseDataChunks);

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

router.post('/test', (req: Request, res: Response) =>
  new TestRoute({ req, res, verbose: true, allowStreaming: false }).handle(),
);

export default router;
