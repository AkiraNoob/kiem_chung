import jsonWebToken from 'jsonwebtoken';
import AppError from '../constant/error';
import { EHttpStatus } from '../constant/statusCode';
import { TJWTPayload } from '../types/api/auth.types';

export type ReturnJWTType = {
  token: string;
  expires: string;
};

const signJWT = (payload: TJWTPayload): ReturnJWTType => {
  const expiresIn = process.env.JWT_EXPIRED;
  const secretKey = process.env.SECRET_KEY;

  if (expiresIn && secretKey) {
    const signedToken = jsonWebToken.sign(payload, secretKey, {
      expiresIn: parseInt(expiresIn),
      algorithm: 'HS256',
    });

    return {
      token: signedToken,
      expires: expiresIn,
    };
  }

  throw new AppError(EHttpStatus.INTERNAL_SERVER_ERROR, 'Can not read .env');
};

export default signJWT;
