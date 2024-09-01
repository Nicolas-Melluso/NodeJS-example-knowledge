import mongoose from 'mongoose';

export const connectDB = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URI);
  }
};

export const closeDB = async () => {
  await mongoose.connection.close();
};
