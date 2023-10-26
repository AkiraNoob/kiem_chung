import express from 'express';
import demoController from './controller';
import demoValidater from './validater';

const demoRoute = express.Router();
demoRoute.get('/', demoController.getDemoPage);
demoRoute.post('/', demoValidater.validateCreateDemo, demoController.postDemoPage);

export default demoRoute;
