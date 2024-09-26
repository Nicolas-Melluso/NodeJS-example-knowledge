import mongoose from 'mongoose';
import { configDotenv } from "dotenv";
configDotenv();

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

export const connectDB = async () => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      process.exit(1); // Detener la aplicación si falla la conexión
    }
  }
};

export const closeDB = async () => {
  await mongoose.connection.close();
};