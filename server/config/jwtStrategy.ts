import { Request } from 'express';
import passportJWT from 'passport-jwt';
import { catchError } from '../common/catchError';
import AppError from '../constant/error';
import { EHttpStatus } from '../constant/statusCode';
import UserModel from '../model/user';
import { TJWTVerify } from '../types/api/auth.types';
import { EAuthCookiesKey, JWTAlgorithm } from './constant';

const generateJWTStrategy = () => {
  const jwtSecret = process.env.SECRET_KEY;

  return new passportJWT.Strategy(
    {
      jwtFromRequest: (req: Request) => {
        return req.cookies[EAuthCookiesKey.Token];
      },
      secretOrKey: jwtSecret,
      algorithms: [JWTAlgorithm],
    },
    async function (jwtPayload: TJWTVerify, done) {
      try {
        const user = await UserModel.findById(jwtPayload.id);
        if (user) {
          return done(null, jwtPayload);
        }
        return done(new AppError(EHttpStatus.UNAUTHORIZED, 'Invalid Credentials.'), false);
      } catch (error) {
        return done(catchError(error), false);
      }
    },
  );
};

export default generateJWTStrategy;
