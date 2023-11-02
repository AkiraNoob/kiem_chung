import { bcryptCompareSync, bcryptHashSync } from '../../common/bcrypt';
import signJWT, { ReturnJWTType } from '../../common/signJWT';
import AppError from '../../constant/error';
import { EHttpStatus } from '../../constant/statusCode';
import UserModel from '../../model/user';
import { TLocalLoginPayload, TRegisterPayload } from '../../types/api/auth.types';
import { TServiceResponseType } from '../../types/general.types';
import userService from '../user/service';

const authService = {
  loginWithEmailAndPassword: async (
    reqBody: TLocalLoginPayload,
  ): Promise<TServiceResponseType<ReturnJWTType | null>> => {
    const user = await UserModel.findOne({ email: reqBody.email });

    if (!user) {
      throw new AppError(EHttpStatus.UNAUTHORIZED, 'Wrong email');
    }

    if (!bcryptCompareSync(reqBody.password, user?.password)) {
      throw new AppError(EHttpStatus.UNAUTHORIZED, 'Wrong password');
    }

    const token = signJWT({
      id: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
    });

    return {
      data: token,
      statusCode: EHttpStatus.OK,
      message: 'Login successfully',
    };
  },
  register: async (reqBody: TRegisterPayload): Promise<TServiceResponseType> => {
    const user = await UserModel.findOne({ email: reqBody.email });
    if (user) {
      return {
        data: null,
        message: 'This email is already exists',
        statusCode: EHttpStatus.BAD_REQUEST,
      };
    }

    reqBody.password = bcryptHashSync(reqBody.password);

    await userService.createUser(reqBody);

    return {
      data: null,
      statusCode: EHttpStatus.OK,
      message: 'Register successfully',
    };
  },
};

export default authService;
