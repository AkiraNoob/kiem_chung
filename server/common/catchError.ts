import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import AppError from '../constant/error';
import { EHttpStatus } from '../constant/statusCode';
import { TServiceResponseType } from '../types/general.types';

const tryCatchWrapper =
  <T>(promise: (req: Request, res: Response, next: NextFunction) => Promise<TServiceResponseType<T>>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await promise(req, res, next);
      res.status(result.statusCode).json({ data: result.data, message: result.message });
    } catch (error) {
      const errorObject = catchError<T>(error);
      res.status(errorObject.statusCode).json({ data: errorObject.data, message: errorObject.message });
    }
  };

const catchError = <T>(error: unknown): TServiceResponseType<T> => {
  if (error instanceof AppError) {
    return {
      data: null,
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return {
      data: null,
      statusCode: EHttpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }

  return {
    data: null,
    statusCode: EHttpStatus.INTERNAL_SERVER_ERROR,
    message: (error as { message: string; [key: string]: unknown })?.message ?? null,
  };
};

export { catchError, tryCatchWrapper };
