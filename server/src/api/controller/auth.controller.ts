import { Request, Response } from 'express';
import { catchError, tryCatchWrapper } from '../../common/catchError';
import { sendAuthCookieToClient } from '../../common/cookies';
import { TLocalLoginPayload, TRegisterPayload } from '../../types/api/auth.types';
import { TServiceResponseBodyType } from '../../types/general.types';
import authService from '../service/auth.service';

const authController = {
  loginWithEmailAndPassword: async (req: Request, res: Response<TServiceResponseBodyType>) => {
    try {
      const { data, statusCode, message } = await authService.loginWithEmailAndPassword(req.body as TLocalLoginPayload);
      sendAuthCookieToClient(res, data).status(statusCode).json({ data: null, message: message });
    } catch (error) {
      const errorObject = catchError(error);
      res.status(errorObject.statusCode).json({ data: errorObject.data, message: errorObject.message });
    }
  },
  register: tryCatchWrapper(async (req: Request) => await authService.register(req.body as TRegisterPayload)),
  refreshToken: async (req: Request, res: Response<TServiceResponseBodyType>) => {
    try {
      const { data, statusCode, message } = await authService.refreshToken(req);
      sendAuthCookieToClient(res, data).status(statusCode).json({ data: null, message: message });
    } catch (error) {
      const errorObject = catchError(error);
      res.status(errorObject.statusCode).json({ data: errorObject.data, message: errorObject.message });
    }
  },
};

export default authController;
