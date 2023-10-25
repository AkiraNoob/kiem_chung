import { Express } from 'express';
import dotenv from 'dotenv';

const dotNetLoader = (app: Express) => {
  dotenv.config();
  return app;
};
export default dotNetLoader;
