import BaseRoute from '@utils/api/BaseRoute';
import { DataManager } from '@utils/api/DataManager';
import { setupRoute } from '@utils/api/setupRoute';
import { checkDatRouteParams } from '@utils/checkDataRouteParams';
import express, { Router } from 'express';

const router = Router();
// Parse JSON bodies (as sent by API clients)
router.use(express.json());

class DeleteDataRoute extends BaseRoute {
  private ids?: string[];
  private ai_table_name?: string;

  private checkParams = () => {
    const { ids, ai_table_name } = checkDatRouteParams(this.req);

    this.ids = ids;
    this.ai_table_name = ai_table_name;
  };

  execute = async () => {
    this.checkParams();
    const dm = new DataManager({
      verbose: this.verbose,
    });

    const deleteDataResponse = await dm.delete({
      data_ids: this.ids,
      ai_table_name: this.ai_table_name,
    });

    this.returnResponse(deleteDataResponse);
  };
}

setupRoute(router, 'post', '/delete-data', DeleteDataRoute, {
  verbose: true,
  allowStreaming: false,
});

export default router;
