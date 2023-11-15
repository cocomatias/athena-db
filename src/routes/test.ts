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
import {
  // mockAssignedDataChunk,
  mockDBBigDataWithoutTokens,
  mockDBDataWithoutTokens,
  mockGroupedDataObjects,
  // mockGroupedDataObjects,
  // mockGroupedSupabaseAIDBData,
} from '@utils/mockData';
// import { OpenAIEmbeddings } from '@utils/api/OpenAIEmbeddings';
import { setupRoute } from '@utils/api/setupRoute';
import abortablePromise from '@utils/api/abortablePromise';
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
      ai_table_name: 'history-of-argentina',
    });
    this.returnResponse(supabaseDataChunks);
  };
}

class TestRoute2 extends BaseRoute {
  execute = async () => {
    // Example of promise
    const data = mockGroupedDataObjects;
    const test = await new DataManager({
      verbose: true,
    }).assignDataChunks({
      data,
    });
    this.returnResponse(test);
  };
}

setupRoute(router, 'post', '/test', TestRoute, {
  verbose: true,
  allowStreaming: false,
});

setupRoute(router, 'post', '/test2', TestRoute2, {
  verbose: true,
  allowStreaming: false,
});

export default router;
