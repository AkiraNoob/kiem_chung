import { Request, Response } from 'express';
import { catchError } from '../../common/catchError';
import { sendSpotifyCookieToClient } from '../../common/cookies';
import { TServiceResponseBodyType } from '../../types/general.types';
import spotifyService from '../service/spotify.service';

const spotifyController = {
  token: async (_req: Request, res: Response<TServiceResponseBodyType>) => {
    try {
      const { data, statusCode, message } = await spotifyService.token();
      sendSpotifyCookieToClient(res, data).status(statusCode).json({ data: null, message: message });
    } catch (error) {
      const errorObject = catchError(error);
      res.status(errorObject.statusCode).json({ data: errorObject.data, message: errorObject.message });
    }
  },
};

export default spotifyController;
