import AppError from '../../constant/error';
import { EHttpStatus } from '../../constant/statusCode';
import UserModel from '../../model/user';
import {
  TGetUserDetailByEmail,
  TGetUserDetailByIdDataResponse,
  TGetUserDetailByIdParam,
} from '../../types/api/user.types';
import { TServiceResponseType } from '../../types/general.types';
import { TUserSchema } from '../../types/schema/user.schema.types';

const userService = {
  createUser: async (req: TUserSchema): Promise<TServiceResponseType<TGetUserDetailByIdDataResponse | null>> => {
    const user = await UserModel.create(req);
    return {
      data: user,
      statusCode: EHttpStatus.OK,
    };
  },
  getUserById: async (
    req: TGetUserDetailByIdParam,
  ): Promise<TServiceResponseType<TGetUserDetailByIdDataResponse | null>> => {
    const user = await UserModel.findById({ _id: req.userId });
    return {
      data: user,
      statusCode: EHttpStatus.OK,
    };
  },
  getUserByEmail: async (
    req: TGetUserDetailByEmail,
  ): Promise<TServiceResponseType<TGetUserDetailByIdDataResponse | null>> => {
    const user = await UserModel.findOne({ email: req.email }); //email is unique
    return {
      data: user,
      statusCode: EHttpStatus.OK,
    };
  },
  getMe: async (user: TUserSchema): Promise<TServiceResponseType<TUserSchema | null>> => {
    const foundUser = await UserModel.findOne({ email: user.email }); //email is unique

    if (!foundUser) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'User not found');
    }

    return {
      data: foundUser,
      statusCode: EHttpStatus.OK,
    };
  },
};

export default userService;
