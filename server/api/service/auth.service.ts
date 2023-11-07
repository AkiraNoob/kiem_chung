import { Request } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import { bcryptCompareSync, bcryptHashSync } from '../../common/bcrypt';
import { ReturnJWTType, signJWT, signRefreshJWT } from '../../common/signJWT';
import AppError from '../../constant/error';
import { EHttpStatus } from '../../constant/statusCode';
import RefreshTokenModel from '../../model/refreshToken';
import UserModel from '../../model/user';
import { TJWTVerify, TLocalLoginPayload, TRegisterPayload } from '../../types/api/auth.types';
import { TServiceResponseType } from '../../types/general.types';
import userService from './user.service';

const authService = {
  loginWithEmailAndPassword: async (
    reqBody: TLocalLoginPayload,
  ): Promise<TServiceResponseType<{ token: ReturnJWTType; refreshToken: ReturnJWTType }>> => {
    const user = await UserModel.findOne({ email: reqBody.email });

    if (!user) {
      throw new AppError(EHttpStatus.UNAUTHORIZED, 'Wrong email');
    }

    if (!bcryptCompareSync(reqBody.password, user?.password)) {
      throw new AppError(EHttpStatus.UNAUTHORIZED, 'Wrong password');
    }

    const userData = {
      id: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
    };

    const token = signJWT(userData);
    const refreshToken = signRefreshJWT(userData);

    await RefreshTokenModel.deleteMany({ userId: new mongoose.Types.ObjectId(userData.id)._id });

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
  refreshToken: async (
    req: Request,
  ): Promise<TServiceResponseType<{ token: ReturnJWTType; refreshToken: ReturnJWTType }>> => {
    const refresToken = req.cookies['refreshToken'];
    const secretKey = process.env.REFRESH_SECRET_KEY;

    if (!secretKey) throw new AppError(EHttpStatus.INTERNAL_SERVER_ERROR, 'Cannot read .env');

    const verifiedRefreshToken = jsonwebtoken.verify(refresToken, secretKey, {
      algorithms: ['HS256'],
    }) as TJWTVerify;

    const userData = {
      id: verifiedRefreshToken.id,
      email: verifiedRefreshToken.email,
      fullName: verifiedRefreshToken.fullName,
    };

    await RefreshTokenModel.deleteMany({ userId: new mongoose.Types.ObjectId(userData.id)._id });

    const token = signJWT(userData);
    const refreshToken = signRefreshJWT(userData);

    await RefreshTokenModel.create({
      userId: userData.id,
      refreshToken: refreshToken.token,
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
