// Vendors
import express, { Request, Response, Router } from 'express';
// Utils
import BaseRoute from '@utils/api/BaseRoute';
import { OpenAIChatCompletion } from '@utils/api/OpenAIChatCompletion';
// Types
import { GPTModelName } from '@types';

const router = Router();
// Parse JSON bodies (as sent by API clients)
router.use(express.json());

class TestRoute extends BaseRoute {
  execute = async () => {
    this.sendMessage('Test route called 1');
    // this.log('Testing', 'Test route called');

    const cp = await new OpenAIChatCompletion({
      verbose: true,
      model: GPTModelName.GPT316k,
      messages: [
        {
          role: 'user',
          content: 'Hey, im testing an API with you. How are you?',
        },
      ],
    }).call();

    this.res.send(cp);
  };
}

router.post('/test', (req: Request, res: Response) =>
  new TestRoute({ req, res, verbose: true, allowStreaming: false }).handle(),
);

export default router;
