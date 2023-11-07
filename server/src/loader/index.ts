import express, { Express } from 'express';
import expressLoader from './express';
import loggerLoader from './logger';
import mongooseLoader from './mongooes';
import passportLoader from './passport';

const appLoader = (connectDB: boolean = true) => {
  const app: Express = express();

  loggerLoader(app);
  connectDB && mongooseLoader(app);
  passportLoader(app);

  //last
  expressLoader(app);

  return app;
};

export default appLoader;
