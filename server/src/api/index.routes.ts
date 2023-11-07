import express from 'express';
import authenticateMiddleware from '../middleware/auth';
import authRoute from './routes/auth.routes';
import userRouter from './routes/user.routes';

const apiRoute = express.Router();

apiRoute.use('/auth', authRoute);
apiRoute.use('/user', authenticateMiddleware, userRouter);

export default apiRoute;
