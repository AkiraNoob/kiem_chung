import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';

const validateWrapper = <T>(
  validateCb: (req: Request<unknown, unknown, T>, res: Response, next: NextFunction) => Promise<T>,
) =>
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      await validateCb(req, res, next);
      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        next(err.message);
        return;
      }
      next(err);
    }
  };

export default validateWrapper;
