import { Request, Response, NextFunction } from 'express';

export const sseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.body.streaming) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
  }
  next();
};
