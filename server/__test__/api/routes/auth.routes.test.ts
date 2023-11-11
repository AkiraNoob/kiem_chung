import lodash, { omit } from 'lodash';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { jestConfigEnv } from '../../../.jest/test.config';
import authService from '../../../src/api/service/auth.service';
import { bcryptHashSync } from '../../../src/common/bcrypt';
import { EHttpStatus } from '../../../src/constant/statusCode';
import appLoader from '../../../src/loader/appLoader';
import UserModel from '../../../src/model/user';
import { TLocalLoginPayload, TRegisterPayload } from '../../../src/types/api/auth.types';
import { TServiceResponseType } from '../../../src/types/general.types';
import { TUserSchema } from '../../../src/types/schema/user.schema.types';

const app = appLoader();
const request = supertest.agent(app);
request.withCredentials(true);

describe('Testing /api/auth', () => {
  let mongoServerSingletonUri: string = '';

  const mockUser: TUserSchema = {
    email: 'tester.001@company.com',
    password: 'Tester@001',
    fullName: 'Tester 001',
  };

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    mongoServerSingletonUri = mongoServer.getUri();
    await mongoose.connect(mongoServerSingletonUri);
    //create 1 exist user
    await UserModel.create({ ...mockUser, password: bcryptHashSync(mockUser.password) });
  });

  afterAll(async () => {
    await UserModel.deleteMany({ email: mockUser.email });
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('POST /register', () => {
    const mockRegisterPayload: TRegisterPayload = {
      email: 'tester.002@company.com',
      password: 'Tester@002',
      fullName: 'Tester 002',
    };

    describe('given invalid payload', () => {
      describe('given register payload: not have value password', () => {
        it('should return 400 and "password is a required field" message', async () => {
          const omitResult = await request
            .post(`/api/auth/register`)
            .send(lodash.omit(mockRegisterPayload, 'password'));
          expect(omitResult.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(omitResult.body.message).toBe('Validation error');
          expect(omitResult.body.data[0]).toStrictEqual({ field: 'password', message: 'password is a required field' });

          const emptyResult = await request.post(`/api/auth/register`).send({ ...mockRegisterPayload, password: '' });
          expect(emptyResult.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(emptyResult.body.message).toBe('Validation error');
          expect(emptyResult.body.data[0]).toStrictEqual({
            field: 'password',
            message: 'password is a required field',
          });

          const nullResult = await request.post(`/api/auth/register`).send({ ...mockRegisterPayload, password: null });
          expect(nullResult.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(nullResult.body.message).toBe('Validation error');
          expect(nullResult.body.data[0]).toStrictEqual({ field: 'password', message: 'password is a required field' });
        });
      });

      describe('given register payload: not have value email', () => {
        it('should return 400 and "email is a required field" message', async () => {
          const omitResult = await request.post(`/api/auth/register`).send(lodash.omit(mockRegisterPayload, 'email'));
          expect(omitResult.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(omitResult.body.message).toBe('Validation error');
          expect(omitResult.body.data[0]).toStrictEqual({ field: 'email', message: 'email is a required field' });

          const emptyResult = await request.post(`/api/auth/register`).send({ ...mockRegisterPayload, email: '' });
          expect(emptyResult.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(emptyResult.body.message).toBe('Validation error');
          expect(emptyResult.body.data[0]).toStrictEqual({ field: 'email', message: 'email is a required field' });

          const nullResult = await request.post(`/api/auth/register`).send({ ...mockRegisterPayload, email: null });
          expect(nullResult.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(nullResult.body.message).toBe('Validation error');
          expect(nullResult.body.data[0]).toStrictEqual({ field: 'email', message: 'email is a required field' });
        });
      });

      describe('given register payload: not have value fullName', () => {
        it('should return 400 "fullName is a required field" message', async () => {
          const omitResult = await request
            .post(`/api/auth/register`)
            .send(lodash.omit(mockRegisterPayload, 'fullName'));
          expect(omitResult.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(omitResult.body.message).toBe('Validation error');
          expect(omitResult.body.data[0]).toStrictEqual({ field: 'fullName', message: 'fullName is a required field' });

          const emptyResult = await request.post(`/api/auth/register`).send({ ...mockRegisterPayload, fullName: '' });
          expect(emptyResult.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(emptyResult.body.message).toBe('Validation error');
          expect(emptyResult.body.data[0]).toStrictEqual({
            field: 'fullName',
            message: 'fullName is a required field',
          });

          const nullResult = await request.post(`/api/auth/register`).send({ ...mockRegisterPayload, fullName: null });
          expect(nullResult.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(nullResult.body.message).toBe('Validation error');
          expect(nullResult.body.data[0]).toStrictEqual({ field: 'fullName', message: 'fullName is a required field' });
        });
      });

      describe('given register payload: invalid format email', () => {
        it('should return 400 and "email format is invalid" message', async () => {
          const result = await request
            .post(`/api/auth/register`)
            .send({ ...mockRegisterPayload, email: 'invalid_email' });

          expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(result.body.message).toBe('Validation error');
          expect(result.body.data[0]).toStrictEqual({ field: 'email', message: 'email format is invalid' });
        });
      });

      describe('given register payload: invalid format password', () => {
        it('should return 400 and "password format is invalid" message', async () => {
          const result = await request
            .post(`/api/auth/register`)
            .send({ ...mockRegisterPayload, password: 'invalid_password' });

          expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(result.body.message).toBe('Validation error');
          expect(result.body.data[0]).toStrictEqual({ field: 'password', message: 'password format is invalid' });
        });
      });

      describe('given register payload: invalid email type', () => {
        it(`should return 400 and message contains "email must be a ${'`'}${typeof mockRegisterPayload.email}${'`'} type"`, async () => {
          const result = await request.post(`/api/auth/register`).send({ ...mockRegisterPayload, email: 123 });

          expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(result.body.message).toBe('Validation error');
          expect(result.body.data[0]).toStrictEqual({
            field: 'email',
            message: expect.stringContaining(`email must be a ${'`'}${typeof mockRegisterPayload.email}${'`'} type`),
          });
        });
      });

      describe('given register payload: invalid password type', () => {
        it(`should return 400 and message contains "password must be a ${'`'}${typeof mockRegisterPayload.password}${'`'} type"`, async () => {
          const result = await request.post(`/api/auth/register`).send({ ...mockRegisterPayload, password: 123 });

          expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(result.body.message).toBe('Validation error');
          expect(result.body.data[0]).toStrictEqual({
            field: 'password',
            message: expect.stringContaining(
              `password must be a ${'`'}${typeof mockRegisterPayload.password}${'`'} type`,
            ),
          });
        });
      });

      describe('given register payload: invalid fullName type', () => {
        it(`should return 400 and message contains "fullName must be a ${'`'}${typeof mockRegisterPayload.fullName}${'`'} type"`, async () => {
          const result = await request.post(`/api/auth/register`).send({ ...mockRegisterPayload, fullName: 123 });

          expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(result.body.message).toBe('Validation error');
          expect(result.body.data[0]).toStrictEqual({
            field: 'fullName',
            message: expect.stringContaining(
              `fullName must be a ${'`'}${typeof mockRegisterPayload.fullName}${'`'} type`,
            ),
          });
        });
      });
    });

    describe('given valid and not-exist email', () => {
      afterAll(async () => await UserModel.deleteMany({ email: mockRegisterPayload.email }));

      it('should return 200', async () => {
        const { statusCode, body } = await request.post(`/api/auth/register`).send(mockRegisterPayload);

        expect(statusCode).toBe(EHttpStatus.OK);
        expect((body as TServiceResponseType).data).toBe(null);
      });
    });

    describe('given valid but already exist email', () => {
      it('shoud return 400 and message contains "duplicate key error collection"', async () => {
        const { statusCode, body } = await request.post(`/api/auth/register`).send(mockUser);
        expect(statusCode).toBe(EHttpStatus.BAD_REQUEST);
        expect(body.data).toBeNull();
        expect(body.message).toStrictEqual(expect.stringContaining('duplicate key error collection'));
      });
    });

    describe('Given server disconnect mongooes', () => {
      beforeAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
      });

      afterAll(async () => {
        await mongoose.connect(mongoServerSingletonUri);
      });

      it('shoud return status 500', async () => {
        const result = await request.post(`/api/auth/register`).send(mockRegisterPayload);
        expect(result.statusCode).toBe(EHttpStatus.INTERNAL_SERVER_ERROR);
      });
    });
  });

  describe('POST /login', () => {
    const mockLoginPayload: TLocalLoginPayload = {
      email: 'tester.002@company.com',
      password: 'Tester@002',
    };

    describe('given invalid payload', () => {
      describe('given register payload: not have value password', () => {
        it('should return 400 and "password is a required field" message', async () => {
          const mockLoginFn = jest.spyOn(authService, 'loginWithEmailAndPassword');

          const omitResult = await request.post(`/api/auth/login`).send(lodash.omit(mockLoginPayload, 'password'));
          expect(omitResult.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(omitResult.body.message).toBe('Validation error');
          expect(omitResult.body.data[0]).toStrictEqual({ field: 'password', message: 'password is a required field' });
          expect(mockLoginFn).toHaveBeenCalledTimes(0);

          const emptyResult = await request.post(`/api/auth/login`).send({ ...mockLoginPayload, password: '' });
          expect(emptyResult.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(emptyResult.body.message).toBe('Validation error');
          expect(emptyResult.body.data[0]).toStrictEqual({
            field: 'password',
            message: 'password is a required field',
          });
          expect(mockLoginFn).toHaveBeenCalledTimes(0);

          const nullResult = await request.post(`/api/auth/login`).send({ ...mockLoginPayload, password: null });
          expect(nullResult.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(nullResult.body.message).toBe('Validation error');
          expect(nullResult.body.data[0]).toStrictEqual({ field: 'password', message: 'password is a required field' });
          expect(mockLoginFn).toHaveBeenCalledTimes(0);
        });
      });

      describe('given register payload: not have value email', () => {
        it('should return 400 and "email is a required field" message', async () => {
          const mockLoginFn = jest.spyOn(authService, 'loginWithEmailAndPassword');

          const omitResult = await request.post(`/api/auth/login`).send(lodash.omit(mockLoginPayload, 'email'));
          expect(omitResult.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(omitResult.body.message).toBe('Validation error');
          expect(omitResult.body.data[0]).toStrictEqual({ field: 'email', message: 'email is a required field' });
          expect(mockLoginFn).toHaveBeenCalledTimes(0);

          const emptyResult = await request.post(`/api/auth/login`).send({ ...mockLoginPayload, email: '' });
          expect(emptyResult.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(emptyResult.body.message).toBe('Validation error');
          expect(emptyResult.body.data[0]).toStrictEqual({ field: 'email', message: 'email is a required field' });
          expect(mockLoginFn).toHaveBeenCalledTimes(0);

          const nullResult = await request.post(`/api/auth/login`).send({ ...mockLoginPayload, email: null });
          expect(nullResult.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(nullResult.body.message).toBe('Validation error');
          expect(nullResult.body.data[0]).toStrictEqual({ field: 'email', message: 'email is a required field' });
          expect(mockLoginFn).toHaveBeenCalledTimes(0);
        });
      });

      describe('given register payload: invalid format email', () => {
        it('should return 400 and "email format is invalid" message', async () => {
          const mockLoginFn = jest.spyOn(authService, 'loginWithEmailAndPassword');

          const result = await request.post(`/api/auth/login`).send({ ...mockLoginPayload, email: 'invalid_email' });

          expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(result.body.message).toBe('Validation error');
          expect(result.body.data[0]).toStrictEqual({ field: 'email', message: 'email format is invalid' });
          expect(mockLoginFn).toHaveBeenCalledTimes(0);
        });
      });

      describe('given register payload: invalid format password', () => {
        it('should return 400 and "password format is invalid" message', async () => {
          const mockLoginFn = jest.spyOn(authService, 'loginWithEmailAndPassword');

          const result = await request
            .post(`/api/auth/login`)
            .send({ ...mockLoginPayload, password: 'invalid_password' });

          expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(result.body.message).toBe('Validation error');
          expect(result.body.data[0]).toStrictEqual({ field: 'password', message: 'password format is invalid' });
          expect(mockLoginFn).toHaveBeenCalledTimes(0);
        });
      });

      describe('given register payload: invalid email type', () => {
        it(`should return 400 and message contains "email must be a ${'`'}${typeof mockLoginPayload.email}${'`'} type"`, async () => {
          const mockLoginFn = jest.spyOn(authService, 'loginWithEmailAndPassword');

          const result = await request.post(`/api/auth/login`).send({ ...mockLoginPayload, email: 123 });

          expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(result.body.message).toBe('Validation error');
          expect(result.body.data[0]).toStrictEqual({
            field: 'email',
            message: expect.stringContaining(`email must be a ${'`'}${typeof mockLoginPayload.email}${'`'} type`),
          });
          expect(mockLoginFn).toHaveBeenCalledTimes(0);
        });
      });

      describe('given register payload: invalid password type', () => {
        it(`should return 400 and message contains "password must be a ${'`'}${typeof mockLoginPayload.password}${'`'} type"`, async () => {
          const mockLoginFn = jest.spyOn(authService, 'loginWithEmailAndPassword');

          const result = await request.post(`/api/auth/login`).send({ ...mockLoginPayload, password: 123 });

          expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(result.body.message).toBe('Validation error');
          expect(result.body.data[0]).toStrictEqual({
            field: 'password',
            message: expect.stringContaining(`password must be a ${'`'}${typeof mockLoginPayload.password}${'`'} type`),
          });
          expect(mockLoginFn).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('given valid but wrong info', () => {
      describe('given not exist email', () => {
        it('should return 400 and "Wrong email" message', async () => {
          const mockWrongEmailLoginPayload = { ...omit(mockUser, 'fullName'), email: mockLoginPayload.email };
          const mockLoginFn = jest.spyOn(authService, 'loginWithEmailAndPassword');
          const { statusCode, body } = await request.post(`/api/auth/login`).send(mockWrongEmailLoginPayload);

          expect(statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect((body as TServiceResponseType).message).toBe('Wrong email');
          expect(mockLoginFn).toHaveBeenCalledTimes(1);
          expect(mockLoginFn).toHaveBeenCalledWith(mockWrongEmailLoginPayload);
        });
      });

      describe('given not wrong password', () => {
        it('should return 400 and "Wrong password" message', async () => {
          const mockWrongPasswordLoginPayload = { ...omit(mockUser, 'fullName'), password: mockLoginPayload.password };
          const mockLoginFn = jest.spyOn(authService, 'loginWithEmailAndPassword');
          const { statusCode, body } = await request.post(`/api/auth/login`).send(mockWrongPasswordLoginPayload);

          expect(statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect((body as TServiceResponseType).message).toBe('Wrong password');
          expect(mockLoginFn).toHaveBeenCalledTimes(1);
          expect(mockLoginFn).toHaveBeenCalledWith(mockWrongPasswordLoginPayload);
        });
      });
    });

    describe('given valid and true info', () => {
      afterAll(async () => await UserModel.deleteMany({ email: mockLoginPayload.email }));

      it('shoud return 200 and data contains {token, refreshToken}', async () => {
        const mockLoginFn = jest.spyOn(authService, 'loginWithEmailAndPassword');
        const { statusCode, body, headers } = await request.post(`/api/auth/login`).send(omit(mockUser, 'fullName'));
        expect(statusCode).toBe(EHttpStatus.OK);

        expect(body.data).toBeNull();
        expect(headers['set-cookie'][0]).toStrictEqual(expect.stringContaining('token'));
        expect(headers['set-cookie'][1]).toStrictEqual(expect.stringContaining('refreshToken'));

        expect(body.message).toBe('Login successfully');
        expect(mockLoginFn).toHaveBeenCalledTimes(1);
      });
    });

    describe('Given server omit .env', () => {
      describe('Given .env omit SECRET_KEY', () => {
        beforeAll(() => {
          jest.resetModules();
          process.env = omit(process.env, 'SECRET_KEY');
        });

        afterAll(async () => {
          jest.resetModules();
          process.env = { ...jestConfigEnv };
        });

        it('shoud return status 500 and message "Can not read .env"', async () => {
          const result = await request.post(`/api/auth/login`).send(omit(mockUser, 'fullName'));

          expect(result.statusCode).toBe(EHttpStatus.INTERNAL_SERVER_ERROR);
          expect(result.body.message).toBe('Can not read .env');
        });
      });

      describe('Given .env omit REFRESH_SECRET_KEY', () => {
        beforeAll(() => {
          jest.resetModules();
          process.env = omit(process.env, 'REFRESH_SECRET_KEY');
        });

        afterAll(async () => {
          jest.resetModules();
          process.env = { ...jestConfigEnv };
        });

        it('shoud return status 500 and message "Can not read .env"', async () => {
          const result = await request.post(`/api/auth/login`).send(omit(mockUser, 'fullName'));

          expect(result.statusCode).toBe(EHttpStatus.INTERNAL_SERVER_ERROR);
          expect(result.body.message).toBe('Can not read .env');
        });
      });
    });

    describe('Given server disconnect mongooes', () => {
      beforeAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
      });

      afterAll(async () => {
        await mongoose.connect(mongoServerSingletonUri);
      });

      it('shoud return status 500', async () => {
        const result = await request.post(`/api/auth/login`).send(omit(mockLoginPayload, 'fullName'));

        expect(result.statusCode).toBe(EHttpStatus.INTERNAL_SERVER_ERROR);
      });
    });
  });

  describe('POST /refreshToken', () => {
    let refreshTokenCookies: string = '';
    let tokenCookies: string = '';

    const loginPayload = omit(mockUser, 'fullName');

    beforeAll(async () => {
      const { headers } = await request.post(`/api/auth/login`).send(loginPayload);

      tokenCookies = headers['set-cookie'][0];
      refreshTokenCookies = headers['set-cookie'][1];
    });

    describe('Given invalid data', () => {
      describe('given refreshToken payload: empty refreshToken', () => {
        it('should return status 400 with message "Validation error" and data contains message "refreshToken is a required field"', async () => {
          const { statusCode, body } = await request.post('/api/auth/refreshToken').set('Cookie', 'refreshToken=""');

          expect(statusCode).toBe(EHttpStatus.BAD_REQUEST);
          expect(body.message).toBe('Validation error');
          expect(body.data[0]).toStrictEqual({ field: 'refreshToken', message: 'refreshToken is a required field' });
        });
      });

      describe('given refreshToken payload: expired refreshToken', () => {
        let refreshTokenCookies: string = '';

        beforeAll(async () => {
          jest.resetModules(); // Most important - it clears the cache
          process.env.REFRESH_JWT_EXPIRED = '0'; // Fake env
          const { headers } = await request.post(`/api/auth/login`).send(loginPayload);
          refreshTokenCookies = headers['set-cookie'][1];
        });

        afterAll(async () => {
          jest.resetModules();
          process.env = { ...jestConfigEnv };
        });

        it('should return status 401 with message "jwt expired"', async () => {
          const result = await request.post('/api/auth/refreshToken').set('Cookie', refreshTokenCookies);

          expect(result.statusCode).toBe(EHttpStatus.UNAUTHORIZED);
          expect(result.body.message).toBe('jwt expired');
          expect(result.body.data).toBeNull();
        });
      });

      describe('given refreshToken payload: invalid refreshToken', () => {
        it('should return status 401', async () => {
          const result = await request.post('/api/auth/refreshToken').set('Cookie', 'refreshToken="null');

          expect(result.statusCode).toBe(EHttpStatus.UNAUTHORIZED);
          expect(result.body.data).toBeNull();
        });
      });
    });

    describe('Given valid data', () => {
      it('should return status 200 and headers set-cookie have 2 fields refreshToken & token with new value', async () => {
        const result = await request.post('/api/auth/refreshToken').set('Cookie', refreshTokenCookies);

        expect(result.statusCode).toBe(EHttpStatus.OK);
        expect(result.headers['set-cookie'[0]]).not.toStrictEqual(tokenCookies);
        expect(result.headers['set-cookie'[1]]).not.toStrictEqual(refreshTokenCookies);
      });
    });

    describe('Given server omit .env', () => {
      beforeAll(() => {
        jest.resetModules();
        process.env = {};
      });

      afterAll(async () => {
        jest.resetModules();
        process.env = { ...jestConfigEnv };
      });

      it('shoud return status 500 and message "Can not read .env"', async () => {
        const result = await request.post('/api/auth/refreshToken').set('Cookie', refreshTokenCookies);

        expect(result.statusCode).toBe(EHttpStatus.INTERNAL_SERVER_ERROR);
        expect(result.body.message).toBe('Can not read .env');
      });
    });

    describe('Given server disconnect mongooes', () => {
      beforeAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
      });

      afterAll(async () => {
        await mongoose.connect(mongoServerSingletonUri);
      });

      it('shoud return status 500', async () => {
        const result = await request.post('/api/auth/refreshToken').set('Cookie', refreshTokenCookies);

        expect(result.statusCode).toBe(EHttpStatus.INTERNAL_SERVER_ERROR);
      });
    });
  });
});
