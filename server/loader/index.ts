import { Express } from 'express';
import expressLoader from './express';
import mongooseLoader from './mongooes';

const appLoader = (app: Express) => {
  expressLoader(app);
  mongooseLoader(app);

  return app;
};

export default appLoader;
