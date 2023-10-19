// Vendors
import { Request, Response } from 'express';
// Utils
import { niceLog } from '@utils/niceLog';
// Types
import { SendMessageFunction } from '@types';

type ErrorHandlerParams = {
  res: Response;
  req: Request;
  error: any;
  sendMessage?: SendMessageFunction['sendMessageFunction'];
  streaming?: boolean;
};

export const handleEndpointError = (params: ErrorHandlerParams) => {
  const { streaming, res, req, sendMessage, error } = params;

  niceLog(`${req.path} endpoint - Error`, error);

  if (streaming && sendMessage) {
    sendMessage(`Error: ${error.message || error}`);
    res.end();
  } else {
    return res.status(500).send(error.message || error);
  }
};
