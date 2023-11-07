import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import apiRoute from '../api/index.routes';

const expressLoader = (app: Express) => {
  app.use(express.json());
  app.use(helmet());
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: [/^http:\/\/localhost/, /^http:\/\/127.0.0.1/],
    }),
  );

  app.use('/api', apiRoute); // Root
  app.use('/static', express.static('../public'));
};

export default expressLoader;
