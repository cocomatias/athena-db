import BaseRoute from '@utils/api/BaseRoute';
import { SupabaseConnection } from '@utils/api/SupabaseConnection';
import { setupRoute } from '@utils/api/setupRoute';
import express, { Router } from 'express';

const router = Router();
// Parse JSON bodies (as sent by API clients)
router.use(express.json());

export class SetupDatabaseRoute extends BaseRoute {
  execute = async () => {
    const sb = SupabaseConnection.getInstance(true);
    const setupDB = await sb.setupDB();
    this.returnResponse(setupDB);
  };
}

setupRoute(router, 'post', '/setup-database', SetupDatabaseRoute, {
  verbose: true,
  allowStreaming: false,
});

export default router;
