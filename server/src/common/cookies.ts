import { CookieOptions, Response } from 'express';
import { EAuthCookiesKey } from '../config/constant';
import { ReturnJWTType } from './signJWT';

export const sendToClientCookieOptions = (expires: string): CookieOptions => ({
  maxAge: parseInt(expires) * 1000, //convert from seconds to milliseconds
  httpOnly: true,
  sameSite: 'none',
  secure: true,
});

export const sendAuthCookieToClient = (
  res: Response,
  authCredentials: { token: ReturnJWTType; refreshToken: ReturnJWTType },
) => {
  const { token, refreshToken } = authCredentials;
  res
    .cookie(EAuthCookiesKey.Token, token, sendToClientCookieOptions(token.expires))
    .cookie(EAuthCookiesKey.RefreshToken, refreshToken.token, sendToClientCookieOptions(refreshToken.expires));
  return res;
};
