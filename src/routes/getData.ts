import express, { Router } from 'express';
import BaseRoute from '@utils/api/BaseRoute';
import { setupRoute } from '@utils/api/setupRoute';
import { checkDatRouteParams } from '@utils/checkDataRouteParams';
import { Data } from '@utils/api/Data';

const router = Router();
// Parse JSON bodies (as sent by API clients)
router.use(express.json());

export class GetDataRoute extends BaseRoute {
  private ids?: string[];
  private ai_table_name?: string;

  private checkParams = () => {
    const { ids, ai_table_name } = checkDatRouteParams(this.req);

    this.ids = ids;
    this.ai_table_name = ai_table_name;
  };

  execute = async () => {
    this.checkParams();
    const data = await new Data().getData({
      ai_table_name: this.ai_table_name,
      ids: this.ids,
      tokensAscending: false,
    });

    this.returnResponse(data?.map((d) => ({ ...d, embedding: undefined })));
  };
}

setupRoute(router, 'post', '/get-data', GetDataRoute, {
  allowStreaming: false,
});

export default router;
