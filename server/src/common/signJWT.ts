import jsonWebToken from 'jsonwebtoken';
import { JWTAlgorithm } from '../config/constant';
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
      algorithm: JWTAlgorithm,
    });

    return {
      token: signedToken,
      expires: expiresIn,
    };
  }

  throw new AppError(EHttpStatus.INTERNAL_SERVER_ERROR, 'Can not read .env');
};

const signRefreshJWT = (payload: TJWTPayload): ReturnJWTType => {
  const expiresIn = process.env.REFRESH_JWT_EXPIRED;
  const secretKey = process.env.REFRESH_SECRET_KEY;

  if (expiresIn && secretKey) {
    const signedToken = jsonWebToken.sign(payload, secretKey, {
      expiresIn: parseInt(expiresIn),
      algorithm: JWTAlgorithm,
    });

    return {
      token: signedToken,
      expires: expiresIn,
    };
  }

  throw new AppError(EHttpStatus.INTERNAL_SERVER_ERROR, 'Can not read .env');
};

export { signJWT, signRefreshJWT };
