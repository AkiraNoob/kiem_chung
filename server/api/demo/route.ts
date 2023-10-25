import express from 'express';
import demoController from './controller';

const demoRoute = express.Router();
demoRoute.use('/demo', demoController.getDemoPage);

export default demoRoute;
