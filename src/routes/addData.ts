import BaseRoute from '@utils/api/BaseRoute';
import { DataManager } from '@utils/api/DataManager';
import { setupRoute } from '@utils/api/setupRoute';
import express, { Router } from 'express';

const router = Router();
// Parse JSON bodies (as sent by API clients)
router.use(express.json());

class AddDataRoute extends BaseRoute {
  private data?: (string | object)[];
  private ai_table_name?: string;

  private checkParams = () => {
    const body = this.req.body;

    const { data, ai_table_name } = body;
    if (!data) {
      throw new Error('Missing data param');
    }

    if (!ai_table_name) {
      throw new Error('Missing ai_table_name param');
    }

    if (typeof ai_table_name !== 'string') {
      throw new Error(`Invalid ai_table_name param: ${typeof ai_table_name}`);
    }

    if (
      typeof data !== 'string' &&
      !Array.isArray(data) &&
      !(typeof data === 'object' && data !== null)
    ) {
      throw new Error(`Invalid data param: ${typeof data}`);
    } else if (Array.isArray(data)) {
      data.forEach((item, index) => {
        if (typeof item !== 'object' || item === null) {
          throw new Error(
            `Invalid data param at index ${index}: ${typeof item}`,
          );
        }
      });
    }

    this.data = Array.isArray(data) ? data : [data];
    this.ai_table_name = ai_table_name;
  };
  execute = async () => {
    this.checkParams();
    const dm = new DataManager({
      verbose: this.verbose,
    });

    const addedData = await dm.add({
      data: this.data!.map((d) => ({
        data: d,
        ai_table_name: this.ai_table_name!,
      })),
      createAITableIfNotExists: true,
    });

    this.returnResponse({ data: this.data, ai_table_name: this.ai_table_name });
  };
}

setupRoute(router, 'post', '/add-data', AddDataRoute, {
  verbose: true,
  allowStreaming: false,
});

export default router;
