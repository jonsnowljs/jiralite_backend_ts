import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './logger';
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error("Could not connect to database")
    process.exit(1)
  }

};

export default connectDB;
