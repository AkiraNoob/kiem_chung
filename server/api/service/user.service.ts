import { EHttpStatus } from '../../constant/statusCode';
import UserModel from '../../model/user';
import { TGetUserDetailParam } from '../../types/api/user.types';
import { TServiceResponseType } from '../../types/general.types';
import { TUserSchema } from '../../types/schema/user.schema.types';

const userService = {
  createUser: async (req: TUserSchema): Promise<TServiceResponseType<TUserSchema | null>> => {
    const user = new UserModel(req);
    await user.save();
    return {
      data: user,
      statusCode: EHttpStatus.OK,
    };
  },
  getUser: async (req: TGetUserDetailParam): Promise<TServiceResponseType<TUserSchema | null>> => {
    const user = await UserModel.findById(
      { _id: req.userId },
      {
        fullName: true,
        email: true,
        _id: true,
      },
    );
    return {
      data: user,
      statusCode: EHttpStatus.OK,
    };
  },
};

export default userService;
