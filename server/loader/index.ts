import { Express } from 'express';
import expressLoader from './express';
import dotNetLoader from './dotnet';

const appLoader = (app: Express) => {
  expressLoader(app);
  dotNetLoader(app);

  return app;
};

export default appLoader;
