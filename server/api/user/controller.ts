import { Request } from 'express';
import { tryCatchWrapper } from '../../common/catchError';
import { TGetUserDetailParam } from '../../types/api/user.types';
import { TUserSchema } from '../../types/schema/user.schema.types';
import userService from './service';

const userController = {
  createUser: tryCatchWrapper(async (req: Request) => await userService.createUser(req.body as TUserSchema)),
  getUser: tryCatchWrapper(async (req: Request) => await userService.getUser(req.params as TGetUserDetailParam)),
};

export default userController;
