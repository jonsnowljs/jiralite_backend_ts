import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv'
import routes from './routes';
import helmet from 'helmet'
import connectDB from './utils/connect';
import logger from './utils/logger';

// import environment variable form .env file
dotenv.config()

// '+' and '!' is used to convert PORT to number type
const PORT: number = +process.env.PORT!

const app = express();
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const middleware =
  ({ name }: { name: string }) =>
  (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.name = name;
    next();
  };



app.use(middleware({ name: 'testname' }));


routes(app)

async function throwError() {
  throw new Error('Boom!')
}
app.get('/error', async (req, res) => {
  try {
    await throwError()
    res.sendStatus(200)
  } catch (e) {
    res.status(400).send('happened')
  }
})


app.listen(PORT, async () => {
  logger.info(
    `Application listening at http://localhost:${PORT}`
  );

  await connectDB()
});
