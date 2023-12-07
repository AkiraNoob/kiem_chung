import { NextFunction, Request, Response } from 'express';
import { ObjectSchema, object, string } from 'yup';
import validateWrapper, { objectValidateOverride } from '../../src/common/validator';
import { EHttpStatus } from '../../src/constant/statusCode';

describe('Test common validator', () => {
  describe('Given objectValidateOverride function', () => {
    describe('Given dto and data', () => {
      it('should run validate method', async () => {
        const mockDTO: ObjectSchema<{ mock: string }> = object({
          mock: string().required().trim(),
        })
          .noUnknown(true)
          .strict();

        const spyedValidate = jest.spyOn(mockDTO, 'validate');

        await objectValidateOverride(mockDTO, { mock: '123' });

        expect(spyedValidate).toHaveBeenCalledTimes(1);
        expect(spyedValidate).toHaveBeenLastCalledWith(
          expect.objectContaining({ mock: '123' }),
          expect.objectContaining({
            abortEarly: false,
          }),
        );
      });
    });
  });

  describe('Given validateWrapper function', () => {
    describe('Given validateCb', () => {
      const req = jest.fn() as unknown as Request;
      const res = { status: jest.fn(), json: jest.fn() } as unknown as Response;
      const next = jest.fn() as unknown as NextFunction;

      it('should resolve validate method and run next function', async () => {
        const validateCbMock = jest.fn();
        validateCbMock.mockResolvedValue('OK');

        await validateWrapper(validateCbMock)(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
      });

      it('should reject validate method and run next function', async () => {
        const validateCbMock = jest.fn();
        validateCbMock.mockRejectedValue({ inner: [] });

        await validateWrapper(validateCbMock)(req, res, next);

        expect(res.status).toHaveBeenCalledWith(EHttpStatus.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Validation error',
          data: expect.any(Array),
        });
      });
    });
  });
});
