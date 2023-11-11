import { CookieOptions, Response } from 'express';
import { EAuthCookiesKey } from '../config/constant';
import { TReturnJWTType } from './signJWT';

export const sendToClientCookieOptions = (expires: string): CookieOptions => ({
  maxAge: parseInt(expires) * 1000, //convert from seconds to milliseconds
  httpOnly: true,
  sameSite: 'none',
  secure: true,
});

export const sendAuthCookieToClient = (
  res: Response,
  authCredentials: { token: TReturnJWTType; refreshToken: TReturnJWTType },
) => {
  const { token, refreshToken } = authCredentials;
  res
    .cookie(EAuthCookiesKey.Token, token.token, sendToClientCookieOptions(token.expires))
    .cookie(EAuthCookiesKey.RefreshToken, refreshToken.token, sendToClientCookieOptions(refreshToken.expires));
  return res;
};
