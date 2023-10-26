import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import { createDemoDTO } from './dto';

const demoValidater = {
  validateCreateDemo: async function (req: Request, res: Response, next: NextFunction) {
    try {
      await createDemoDTO.validate(req.body);
      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        next(err.message);
        return;
      }
      next(err);
    }
  },
};

export default demoValidater;
