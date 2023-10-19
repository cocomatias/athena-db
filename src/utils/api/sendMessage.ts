import { Response } from 'express';

export const sendMessage = async (params: {
  message: string;
  res: Response;
  streaming: boolean;
}) => {
  const { message, res, streaming } = params;

  if (message && streaming) {
    const lines = message.split('\n');
    for (const line of lines) {
      res.write(`data: ${line}\n`);
    }
    // End the message with an extra newline
    res.write('\n');
  }
};
