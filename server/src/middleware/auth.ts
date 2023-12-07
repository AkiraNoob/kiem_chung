import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import generateJWTStrategy from '../config/jwtStrategy';
import { EHttpStatus } from '../constant/statusCode';
import { TUserSchema } from '../types/schema/user.schema.types';

const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  passport.use(generateJWTStrategy());
  passport.authenticate('jwt', { session: false }, (err: Error, user: TUserSchema) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(EHttpStatus.UNAUTHORIZED).json({ message: 'Invalid Credentials' });
      return;
    }
    return next();
  })(req, res, next);
};

export default authenticateMiddleware;
