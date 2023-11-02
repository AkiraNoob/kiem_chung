import { Request } from 'express';
import { tryCatchWrapper } from '../../common/catchError';
import { TLocalLoginPayload, TRegisterPayload } from '../../types/api/auth.types';
import authService from './service';

const authController = {
  loginWithEmailAndPassword: tryCatchWrapper(
    async (req: Request) => await authService.loginWithEmailAndPassword(req.body as TLocalLoginPayload),
  ),
  register: tryCatchWrapper(async (req: Request) => await authService.register(req.body as TRegisterPayload)),
};

export default authController;
