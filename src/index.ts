// Vendors
import express from 'express';
import dotenv from 'dotenv';
// Middlewares
import checkToken from '@middleware/auth';
// Utils
import { niceLog } from '@utils/niceLog';

dotenv.config();

// Check if required environment variables are present
const requiredEnvVariables = [
  'OPENAI_API_KEY',
  'SECRET_KEY',
];

for (const envVariable of requiredEnvVariables) {
  if (!process.env[envVariable]) {
    niceLog(
      'Missing required environment variable',
      envVariable,
      undefined,
      true,
    );
    throw new Error(`Missing required environment variable: ${envVariable}`);
  }
}

const app = express();
const port = process.env.PORT || 3000;

app.use(checkToken);

const server = app.listen(port, () => {
  const addressInfo = server.address();
  const address =
    typeof addressInfo === 'string'
      ? addressInfo
      : `http://localhost:${addressInfo?.port}`;
  niceLog('App working', `App listening at ${address}`);
});
