import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import { EHttpStatus } from '../constant/statusCode';
import { TValidatorResponseBodyType } from '../types/general.types';

const validateWrapper = <T>(
  validateCb: (req: Request<unknown, unknown, T>, res: Response, next: NextFunction) => Promise<T>,
) =>
  async function (req: Request, res: Response<TValidatorResponseBodyType>, next: NextFunction) {
    try {
      await validateCb(req, res, next);
      next();
    } catch (err) {
      console.log(JSON.parse(JSON.stringify(err)));
      res.status(EHttpStatus.BAD_REQUEST);
      if (err instanceof ValidationError) {
        res.json({
          message: 'Validation error: ' + err.inner.map((item) => item.message).join(', ') || '',
        });
        return;
      }
      res.json({
        message: 'Validation error: missing required field.',
      });
    }
  };

export default validateWrapper;
