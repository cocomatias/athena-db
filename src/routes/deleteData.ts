import BaseRoute from '@utils/api/BaseRoute';
import { DataManager } from '@utils/api/DataManager';
import { setupRoute } from '@utils/api/setupRoute';
import express, { Router } from 'express';

const router = Router();
// Parse JSON bodies (as sent by API clients)
router.use(express.json());

class DeleteDataRoute extends BaseRoute {
  private ids?: string[];
  private ai_table_name?: string;

  private checkParams = () => {
    const body = this.req.body;
    const { ids, ai_table_name } = body;

    if (ids) {
      if (!Array.isArray(ids)) {
        throw new Error(`Invalid ids param: ${typeof ids}`);
      }
      if (!ids.length) {
        throw new Error(`No ids provided`);
      }
      if (ids.some((id) => typeof id !== 'string' || !id.length)) {
        throw new Error(`All the ids must be non empty strings`);
      }
    }

    if (ai_table_name && typeof ai_table_name !== 'string') {
      throw new Error(`Invalid ai_table_name param: ${typeof ai_table_name}`);
    }

    if (!ids && !ai_table_name) {
      throw new Error(`You must provide either ids or ai_table_name param`);
    }

    if (ids && ai_table_name) {
      throw new Error(
        `You must provide either ids or ai_table_name param, not both`,
      );
    }

    this.ids = ids;
    this.ai_table_name = ai_table_name;
  };
  execute = async () => {
    this.checkParams();
    const dm = new DataManager({
      verbose: this.verbose,
    });

    const test = await dm.delete({
      data_ids: this.ids,
      ai_table_name: this.ai_table_name,
    });
    this.returnResponse(test);
  };
}

setupRoute(router, 'post', '/delete-data', DeleteDataRoute, {
  verbose: true,
  allowStreaming: false,
});

export default router;
