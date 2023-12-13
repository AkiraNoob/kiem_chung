import express from 'express';
import authenticateMiddleware from '../middleware/auth';
import authRoute from './routes/auth.routes';
import spotifyRoute from './routes/spotify.routes';
import userRoute from './routes/user.routes';

const apiRoute = express.Router();

apiRoute.use('/spotify', authenticateMiddleware, spotifyRoute);
apiRoute.use('/auth', authRoute);
apiRoute.use('/user', authenticateMiddleware, userRoute);

export default apiRoute;
