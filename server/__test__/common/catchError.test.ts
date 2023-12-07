import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { catchError, tryCatchWrapper } from '../../src/common/catchError';
import AppError from '../../src/constant/error';
import { EHttpStatus } from '../../src/constant/statusCode';

describe('Test common catchError', () => {
  describe('Given catchError function', () => {
    describe('Given AppError', () => {
      it('should return object contain data, message, statusCode', () => {
        const error = new AppError(EHttpStatus.INTERNAL_SERVER_ERROR, 'Error');
        expect(catchError(error)).toStrictEqual({
          data: null,
          statusCode: EHttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error',
        });
      });
    });

    describe('Given mongoose.Error.ValidationError or mongoose.mongo.MongoServerError or mongoose.Error.CastError', () => {
      it('should return object contain data, message, statusCode 400', () => {
        const error = new mongoose.Error.ValidationError({ message: 'Error', name: 'Random' });
        expect(catchError(error)).toStrictEqual({
          data: null,
          statusCode: EHttpStatus.BAD_REQUEST,
          message: 'Validation failed',
        });
      });
    });

    describe('Given JsonWebTokenError or TokenExpiredError or NotBeforeError', () => {
      it('should return object contain data, message, statusCode 401', () => {
        const error = new JsonWebTokenError('Error');
        expect(catchError(error)).toStrictEqual({
          data: null,
          statusCode: EHttpStatus.UNAUTHORIZED,
          message: 'Error',
        });
      });
    });

    describe('Given Error', () => {
      it('should return object contain data, message, statusCode 500', () => {
        const error = new Error('Error');
        expect(catchError(error)).toStrictEqual({
          data: null,
          statusCode: EHttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error',
        });
      });
    });
  });

  describe('Given tryCatchWrapper function', () => {
    const req = jest.fn() as unknown as Request;
    const res = { status: jest.fn(() => res), json: jest.fn(() => res) } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;
    describe('Given callback', () => {
      describe('Callback resolve', () => {
        it('should resolve callback method and run res function with status and json method', async () => {
          const cbMock = jest.fn();
          cbMock.mockResolvedValue({
            statusCode: EHttpStatus.OK,
            data: null,
            message: 'OK',
          });

          await tryCatchWrapper(cbMock)(req, res, next);

          expect(res.status).toHaveBeenCalledWith(EHttpStatus.OK);
          expect(res.json).toHaveBeenCalledWith({
            data: null,
            message: 'OK',
          });
        });
      });

      describe('Callback reject AppError', () => {
        it('should reject callback method and run res function with status and json method', async () => {
          const cbMock = jest.fn();
          cbMock.mockRejectedValue(new AppError(EHttpStatus.INTERNAL_SERVER_ERROR, 'Error'));

          await tryCatchWrapper(cbMock)(req, res, next);

          expect(res.status).toHaveBeenCalledWith(EHttpStatus.INTERNAL_SERVER_ERROR);
          expect(res.json).toHaveBeenCalledWith({
            message: 'Error',
            data: null,
          });
        });
      });

      describe('Callback reject mongoose.Error.ValidationError or mongoose.mongo.MongoServerError or mongoose.Error.CastError', () => {
        it('should reject callback method and run res function with status and json method', async () => {
          const cbMock = jest.fn();
          cbMock.mockRejectedValue(new mongoose.Error.ValidationError({ message: 'Error', name: 'Random' }));

          await tryCatchWrapper(cbMock)(req, res, next);

          expect(res.status).toHaveBeenCalledWith(EHttpStatus.BAD_REQUEST);
          expect(res.json).toHaveBeenCalledWith({
            message: 'Validation failed',
            data: null,
          });
        });
      });

      describe('Callback reject JsonWebTokenError or TokenExpiredError or NotBeforeError', () => {
        it('should reject callback method and run res function with status and json method', async () => {
          const cbMock = jest.fn();
          cbMock.mockRejectedValue(new JsonWebTokenError('Error'));

          await tryCatchWrapper(cbMock)(req, res, next);

          expect(res.status).toHaveBeenCalledWith(EHttpStatus.UNAUTHORIZED);
          expect(res.json).toHaveBeenCalledWith({
            message: 'Error',
            data: null,
          });
        });
      });

      describe('Callback reject JsonWebTokenError or TokenExpiredError or NotBeforeError', () => {
        it('should reject callback method and run res function with status and json method', async () => {
          const cbMock = jest.fn();
          cbMock.mockRejectedValue(new Error('Error'));

          await tryCatchWrapper(cbMock)(req, res, next);

          expect(res.status).toHaveBeenCalledWith(EHttpStatus.INTERNAL_SERVER_ERROR);
          expect(res.json).toHaveBeenCalledWith({
            message: 'Error',
            data: null,
          });
        });
      });
    });
  });
});
