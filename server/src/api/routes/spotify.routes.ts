import express from 'express';
import spotifyController from '../controller/spotify.controller';

const spotifyRoute = express.Router();

spotifyRoute.post('/token', spotifyController.token);

export default spotifyRoute;
