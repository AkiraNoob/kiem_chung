import express from 'express';
import demoRoute from './demo/route';
const apiRoute = express.Router();

apiRoute.use(demoRoute);

export default apiRoute;
