import BaseRoute from '@utils/api/BaseRoute';
import { DataResponder } from '@utils/api/DataResponder';
import { setupRoute } from '@utils/api/setupRoute';
import express, { Router } from 'express';

const router = Router();
// Parse JSON bodies (as sent by API clients)
router.use(express.json());

class DataResponderRoute extends BaseRoute {
  private ai_table_name?: string;
  private question?: string;

  private checkParams = () => {
    const { ai_table_name, question } = this.req.body;

    if (!ai_table_name) {
      throw new Error('Missing ai_table_name param');
    }

    if (!question) {
      throw new Error('Missing question param');
    }

    this.ai_table_name = ai_table_name;
    this.question = question;
  };
  execute = async () => {
    this.checkParams();
    const answer = await new DataResponder({
      verbose: this.verbose,
    }).ask({
      ai_table_name: this.ai_table_name!,
      question: this.question!,
    });

    this.returnResponse(answer);
  };
}

setupRoute(router, 'post', '/data-responder', DataResponderRoute, {
  verbose: true,
  allowStreaming: false,
});

export default router;
