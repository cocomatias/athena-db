import BaseRoute from '@utils/api/BaseRoute';
import { DataManager } from '@utils/api/DataManager';
import { setupRoute } from '@utils/api/setupRoute';
import { mockDBBigDataWithoutTokens } from '@utils/mockData';
import express, { Router } from 'express';

const router = Router();
// Parse JSON bodies (as sent by API clients)
router.use(express.json());

export class DataManagerRoute extends BaseRoute {
  execute = async () => {
    const dm = new DataManager({
      verbose: this.verbose,
    });

    const bigDataTest = [
      {
        ai_table_name: 'history-of-argentina',
        data: mockDBBigDataWithoutTokens[0],
      },
      {
        ai_table_name: 'history-of-argentina',
        data: mockDBBigDataWithoutTokens[1],
      },
      {
        ai_table_name: 'history-of-argentina',
        data: mockDBBigDataWithoutTokens[2],
      },
    ];

    const bidDataTest2 = [
      {
        ai_table_name: 'history-of-argentina',
        data: mockDBBigDataWithoutTokens[3],
      },
    ];

    const addedData = await dm.add({
      data: bidDataTest2,
      createAITableIfNotExists: true,
    });
    this.returnResponse(addedData);
  };
}

setupRoute(router, 'post', '/data-manager', DataManagerRoute, {
  allowStreaming: false,
  verbose: true,
});

export default router;
