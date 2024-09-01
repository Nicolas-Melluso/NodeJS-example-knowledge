import mongoose from 'mongoose';
import { configDotenv } from "dotenv";
configDotenv();

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

export const connectDB = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);
  }
};

export const closeDB = async () => {
  await mongoose.connection.close();
};
