import { Request } from 'express';
import { tryCatchWrapper } from '../../common/catchError';
import { TGetUserDetailByIdParam } from '../../types/api/user.types';
import { TUserSchema } from '../../types/schema/user.schema.types';
import userService from '../service/user.service';

const userController = {
  createUser: tryCatchWrapper(async (req: Request) => await userService.createUser(req.body as TUserSchema)),
  getUserById: tryCatchWrapper(
    async (req: Request) => await userService.getUserById(req.params as TGetUserDetailByIdParam),
  ),
};

export default userController;
