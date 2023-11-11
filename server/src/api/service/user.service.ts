import { EHttpStatus } from '../../constant/statusCode';
import UserModel from '../../model/user';
import { TGetUserDetailByEmail, TGetUserDetailByIdParam } from '../../types/api/user.types';
import { TServiceResponseType } from '../../types/general.types';
import { TUserSchema } from '../../types/schema/user.schema.types';

const userService = {
  createUser: async (req: TUserSchema): Promise<TServiceResponseType<TUserSchema | null>> => {
    const user = await UserModel.create(req);
    return {
      data: user,
      statusCode: EHttpStatus.OK,
    };
  },
  getUserById: async (req: TGetUserDetailByIdParam): Promise<TServiceResponseType<TUserSchema | null>> => {
    const user = await UserModel.findById({ _id: req.userId });
    return {
      data: user,
      statusCode: EHttpStatus.OK,
    };
  },
  getUserByEmail: async (req: TGetUserDetailByEmail): Promise<TServiceResponseType<TUserSchema | null>> => {
    const user = await UserModel.findOne({ email: req.email }); //email is unique
    return {
      data: user,
      statusCode: EHttpStatus.OK,
    };
  },
};

export default userService;
