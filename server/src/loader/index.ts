import express, { Express } from 'express';
import expressLoader from './express';
import loggerLoader from './logger';
import passportLoader from './passport';

const appLoader = () => {
  const app: Express = express();

  loggerLoader(app);
  passportLoader(app);

  //last
  expressLoader(app);

  return app;
};

export default appLoader;
