import mongoose from 'mongoose';
import { bcryptCompareSync, bcryptHashSync } from '../../common/bcrypt';
import { TReturnJWTType, signJWT, signRefreshJWT, verifyRefreshJWT } from '../../common/signJWT';
import AppError from '../../constant/error';
import { EHttpStatus } from '../../constant/statusCode';
import RefreshTokenModel from '../../model/refreshToken';
import UserModel from '../../model/user';
import { TLocalLoginPayload, TRegisterPayload } from '../../types/api/auth.types';
import { TServiceResponseType } from '../../types/general.types';

const authService = {
  loginWithEmailAndPassword: async (
    reqBody: TLocalLoginPayload,
  ): Promise<TServiceResponseType<{ token: TReturnJWTType; refreshToken: TReturnJWTType }>> => {
    const user = await UserModel.findOne({ email: reqBody.email }).select('+password');

    if (!user) {
      throw new AppError(EHttpStatus.BAD_REQUEST, 'Wrong email');
    }

    if (!bcryptCompareSync(reqBody.password, user.password)) {
      throw new AppError(EHttpStatus.BAD_REQUEST, 'Wrong password');
    }

    const userData = {
      id: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
    };

    const token = signJWT(userData);
    const refreshToken = signRefreshJWT(userData);

    await RefreshTokenModel.deleteMany({ userId: new mongoose.Types.ObjectId(userData.id) });

    await RefreshTokenModel.create({
      userId: user._id,
      refreshToken: refreshToken.token,
      expiredAt: refreshToken.expires,
    });

    return {
      data: {
        token,
        refreshToken,
      },
      statusCode: EHttpStatus.OK,
      message: 'Login successfully',
    };
  },
  register: async (reqBody: TRegisterPayload): Promise<TServiceResponseType> => {
    reqBody.password = bcryptHashSync(reqBody.password);
    await UserModel.create(reqBody);

    return {
      data: null,
      statusCode: EHttpStatus.OK,
      message: '',
    };
  },
  refreshToken: async (
    cookiesRefreshToken: string,
  ): Promise<TServiceResponseType<{ token: TReturnJWTType; refreshToken: TReturnJWTType }>> => {
    const verifiedRefreshToken = verifyRefreshJWT(cookiesRefreshToken);
    const userData = {
      id: verifiedRefreshToken.id,
      email: verifiedRefreshToken.email,
      fullName: verifiedRefreshToken.fullName,
    };

    await RefreshTokenModel.deleteMany({ userId: new mongoose.Types.ObjectId(userData.id) });

    const token = signJWT(userData);
    const refreshToken = signRefreshJWT(userData);

    await RefreshTokenModel.create({
      userId: userData.id,
      refreshToken: refreshToken.token,
      expiredAt: refreshToken.expires,
    });

    return {
      data: {
        token,
        refreshToken,
      },
      statusCode: EHttpStatus.OK,
      message: 'Refreshed token successfully',
    };
  },
};

export default authService;
