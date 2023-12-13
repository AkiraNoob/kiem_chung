import { Request } from 'express';
import { tryCatchWrapper } from '../../common/catchError';
import { TGetUserDetailByIdParam } from '../../types/api/user.types';
import { TUserSchema } from '../../types/schema/user.schema.types';
import userService from '../service/user.service';

const userController = {
  getUserById: tryCatchWrapper(
    async (req: Request) => await userService.getUserById(req.params as TGetUserDetailByIdParam),
  ),
  getMe: tryCatchWrapper(async (req: Request) => await userService.getMe(req.user as TUserSchema)),
};

export default userController;
