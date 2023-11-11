import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { omit } from 'lodash';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { registerDTO } from '../../../src/api/DTO/auth.dto';
import authService from '../../../src/api/service/auth.service';
import { bcryptHashSync } from '../../../src/common/bcrypt';
import { TReturnJWTType } from '../../../src/common/signJWT';
import AppError from '../../../src/constant/error';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../../src/constant/regex';
import { EHttpStatus } from '../../../src/constant/statusCode';
import UserModel from '../../../src/model/user';
import { TLocalLoginPayload, TRegisterPayload } from '../../../src/types/api/auth.types';

const mockRegisterPayload: TRegisterPayload = {
  email: 'tester.001@company.com',
  password: 'Tester@001',
  fullName: 'Tester 001',
};

const mockLocalLoginPayload: TLocalLoginPayload = omit(mockRegisterPayload, 'fullName');

describe('Testing auth service', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    //create 1 user to test
    await UserModel.create({ ...mockRegisterPayload, password: bcryptHashSync(mockRegisterPayload.password) });
  });

  afterAll(async () => {
    await UserModel.deleteMany({ email: mockRegisterPayload.email });
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('Login with email and password service', () => {
    describe('Given valid payload', () => {
      it('should return statusCode 200 and data should contain {token, refreshToken} and message is "Login successfully"', async () => {
        const result = await authService.loginWithEmailAndPassword(mockLocalLoginPayload);
        expect(result.statusCode).toBe(EHttpStatus.OK);

        expect(result.data.refreshToken).toStrictEqual({
          token: expect.any(String),
          expires: expect.any(String),
        });

        expect(result.data.token).toStrictEqual({
          token: expect.any(String),
          expires: expect.any(String),
        });

        expect(result.message).toBe('Login successfully');
      });
    });

    describe('Given invalid payload', () => {
      describe('Given non-exist email', () => {
        it('should return statusCode 400 and message is "Wrong email"', async () => {
          const invalidEmail = 'LoremIpsum';
          expect(invalidEmail).not.toMatch(EMAIL_REGEX);
          try {
            await authService.loginWithEmailAndPassword({ ...mockLocalLoginPayload, email: invalidEmail });
          } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect((error as AppError).statusCode).toBe(EHttpStatus.BAD_REQUEST);
            expect((error as AppError).message).toBe('Wrong email');
          }
        });
      });

      describe('Given invalid email', () => {
        it('should return statusCode 400 and message is "Wrong email"', async () => {
          const invalidEmail = 'LoremIpsum';
          expect(invalidEmail).not.toMatch(EMAIL_REGEX);
          try {
            await authService.loginWithEmailAndPassword({ ...mockLocalLoginPayload, email: invalidEmail });
          } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect((error as AppError).statusCode).toBe(EHttpStatus.BAD_REQUEST);
            expect((error as AppError).message).toBe('Wrong email');
          }
        });
      });

      describe('Given wrong password', () => {
        it('should return statusCode 400 and message is "Wrong password"', async () => {
          const invalidPassword = 'abc';
          expect(invalidPassword).not.toMatch(PASSWORD_REGEX);
          try {
            await authService.loginWithEmailAndPassword({ ...mockLocalLoginPayload, password: invalidPassword });
          } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            expect((error as AppError).statusCode).toBe(EHttpStatus.BAD_REQUEST);
            expect((error as AppError).message).toBe('Wrong password');
          }
        });
      });
    });
  });

  describe('Register service', () => {
    describe('Given valid payload', () => {
      it('should return statusCode 200 and data is null and message is "Register successfully"', async () => {
        const newMockRegisterPaylod: TRegisterPayload = {
          email: 'tester.002@company.com',
          password: 'Tester@002',
          fullName: 'Tester 002',
        };

        expect(registerDTO.validate(newMockRegisterPaylod)).toBeTruthy();

        const result = await authService.register(newMockRegisterPaylod);
        expect(result.statusCode).toBe(EHttpStatus.OK);
        expect(result.data).toBeNull();
        expect(result.message).toBe('Register successfully');
      });
    });

    describe('Given invalid payload', () => {
      describe('Given exist email', () => {
        it('should return error is instanceOf MongoServerError message contains "duplicate key error collection"', async () => {
          try {
            await authService.register(mockRegisterPayload);
          } catch (error) {
            const _err = error as mongoose.mongo.MongoServerError;
            expect(_err).toBeInstanceOf(mongoose.mongo.MongoServerError);
            expect(_err.message).toStrictEqual(expect.stringContaining('duplicate key error collection'));
          }
        });
      });
    });
  });

  describe('Refresh token service', () => {
    const refreshToken: TReturnJWTType = { token: '', expires: '' };

    beforeAll(async () => {
      const result = await authService.loginWithEmailAndPassword(mockLocalLoginPayload);
      refreshToken.token = result.data.refreshToken.token;
      refreshToken.expires = result.data.refreshToken.expires;
    });

    describe('Given valid payload', () => {
      it('should return statusCode 200 and data should contain {token, refreshToken} and message is "Refreshed token successfully"', async () => {
        const result = await authService.refreshToken(refreshToken.token);
        expect(result.statusCode).toBe(EHttpStatus.OK);

        refreshToken.token = result.data.refreshToken.token;
        refreshToken.expires = result.data.refreshToken.expires;

        expect(result.data.refreshToken).toStrictEqual({
          token: expect.any(String),
          expires: expect.any(String),
        });

        expect(result.data.token).toStrictEqual({
          token: expect.any(String),
          expires: expect.any(String),
        });

        expect(result.message).toBe('Refreshed token successfully');
      });
    });

    describe('Given invalid payload', () => {
      describe('Given invalid jwt', () => {
        it('should return error is instanceOf JsonWebTokenError', async () => {
          try {
            await authService.refreshToken(refreshToken.token.slice(0, refreshToken.token.length - 1));
          } catch (error) {
            expect(error).toBeInstanceOf(JsonWebTokenError);
          }
        });
      });

      describe('Given expired jwt', () => {
        const refreshToken: TReturnJWTType = { token: '', expires: '' };

        beforeAll(async () => {
          jest.resetModules();
          process.env.REFRESH_JWT_EXPIRED = '0';

          const result = await authService.loginWithEmailAndPassword(mockLocalLoginPayload);
          refreshToken.token = result.data.refreshToken.token;
          refreshToken.expires = result.data.refreshToken.expires;
        });

        it('should return error is instanceOf TokenExpiredError', async () => {
          try {
            await authService.refreshToken(refreshToken.token);
          } catch (error) {
            expect(error).toBeInstanceOf(TokenExpiredError);
          }
        });
      });
    });
  });
});
