import express, { Express } from 'express';
import apiRoute from '../api';

const expressLoader = (app: Express) => {
  app.use(express.json());

  app.use('/static', express.static('public'));
  app.use('/api/v1', apiRoute); // Root
};

export default expressLoader;
