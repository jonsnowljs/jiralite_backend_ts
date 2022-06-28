import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv'
// import helmet from 'helmet'
import connectDB from './utils/connectDB';
import logger from './utils/logger';
import router from './routes';
// import environment variable form .env file
dotenv.config()

// '+' and '!' is used to convert PORT to number type
const PORT: number = +process.env.PORT!

const app = express();

// express.json() is express's build-in middleware to parse the incoming request with JSON payloads
app.use(express.json());

app.use(router)


app.listen(PORT, async () => {
  logger.info(
    `Application listening at http://localhost:${PORT}`
  );

  await connectDB()
});
