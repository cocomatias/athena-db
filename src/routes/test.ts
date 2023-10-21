// Vendors
import express, { Request, Response, Router } from 'express';
// Utils
import BaseRoute from '@utils/api/BaseRoute';
import { OpenAIChatCompletion } from '@utils/api/OpenAIChatCompletion';
// Types
import { AIDBData, GPTModelName } from '@types';
import { groupDataByTokens } from '@utils/groupDataByTokens';
import { SupabaseConnection } from '@utils/api/SupabaseConnection';

const router = Router();
// Parse JSON bodies (as sent by API clients)
router.use(express.json());

class TestRoute extends BaseRoute {
  execute = async () => {
    const supabase = new SupabaseConnection(true);
    const tableData = {
      name: 'test1',
    };
    const aiTableData = await supabase.insertData({
      table_name: 'ai_db_table',
      data: tableData,
    });

    this.returnResponse(aiTableData);
  };
}

router.post('/test', (req: Request, res: Response) =>
  new TestRoute({ req, res, verbose: true, allowStreaming: false }).handle(),
);

export default router;
