import express from 'express';
import authRoute from './auth/route';
import userRouter from './user/route';

const apiRoute = express.Router();

apiRoute.use('/auth', authRoute);
apiRoute.use('/user', userRouter);

export default apiRoute;
