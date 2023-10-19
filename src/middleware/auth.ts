import { Request, Response, NextFunction } from 'express';

/**
 * Middleware function to check if the request contains the correct bearer token.
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 */
const checkToken = (req: Request, res: Response, next: NextFunction): void => {
  const bearerHeader = req.headers['authorization'];

  // Check if bearer is undefined
  if (typeof bearerHeader === 'undefined') {
    res.status(403).send('Access denied: No token provided');
    return;
  }

  // Split at the space (Bearer TOKEN_VALUE)
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];

  if (bearerToken !== process.env.SECRET_KEY) {
    res.status(403).send('Access denied: Invalid token');
    return;
  }

  next();
};

export default checkToken;
