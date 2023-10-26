import { Express } from 'express';
import mongoose from 'mongoose';

const mongooseLoader = async (app: Express) => {
  const MONGODB_CONNECT_STRING = process.env.MONGODB_CONNECT_STRING;
  const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

  try {
    if (MONGODB_CONNECT_STRING && MONGODB_PASSWORD)
      await mongoose.connect(MONGODB_CONNECT_STRING.replace('<password>', MONGODB_PASSWORD));
    console.log('Connected MongoDB successfully');
  } catch (error) {
    console.error(error);
  }

  return app;
};

export default mongooseLoader;
