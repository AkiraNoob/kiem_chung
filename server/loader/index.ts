import { Express } from 'express';
import expressLoader from './express';
import loggerLoader from './logger';
import mongooseLoader from './mongooes';
import passportLoader from './passport';

const appLoader = (app: Express) => {
  loggerLoader(app);
  mongooseLoader(app);
  passportLoader(app);

  //last
  expressLoader(app);

  return app;
};

export default appLoader;
