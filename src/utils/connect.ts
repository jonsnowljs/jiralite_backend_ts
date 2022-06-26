import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { cyan } from 'colors';
dotenv.config();

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI!);

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan);
};

export default connectDB;
