import lodash from 'lodash';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import authService from '../../api/service/auth.service';
import { EHttpStatus } from '../../constant/statusCode';
import appLoader from '../../loader';
import { TRegisterPayload } from '../../types/api/auth.types';
import { TServiceResponseType } from '../../types/general.types';

const app = appLoader();

export const mockRegisterPayload: TRegisterPayload = {
  email: 'tester.001@company.com',
  password: 'Tester@001',
  fullName: 'Tester 001',
};

describe('/auth', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('POST /register', () => {
    describe('given completed register payload', () => {
      it('should return 200', async () => {
        const mockRegisterFn = jest.spyOn(authService, 'register');
        const { statusCode, body } = await supertest(app).post(`/api/auth/register`).send(mockRegisterPayload);

        expect(statusCode).toBe(EHttpStatus.OK);
        expect((body as TServiceResponseType).data).toBe(null);
        expect(mockRegisterFn).toHaveBeenCalledTimes(1);
        expect(mockRegisterFn).toHaveBeenCalledWith({ ...mockRegisterPayload, password: expect.any(String) });
      });
    });

    describe('given register payload: exclude password', () => {
      it('should return 400', async () => {
        const mockRegisterFn = jest.spyOn(authService, 'register');

        const result = await supertest(app)
          .post(`/api/auth/register`)
          .send(lodash.omit(mockRegisterPayload, 'password'));

        expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
        expect(JSON.parse(result.text).message).toBe('Validation error: password is a required field');
        expect(mockRegisterFn).toHaveBeenCalledTimes(0);
      });
    });

    describe('given register payload: exclude email', () => {
      it('should return 400', async () => {
        const mockRegisterFn = jest.spyOn(authService, 'register');

        const result = await supertest(app).post(`/api/auth/register`).send(lodash.omit(mockRegisterPayload, 'email'));

        expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
        expect(JSON.parse(result.text).message).toBe('Validation error: email is a required field');
        expect(mockRegisterFn).toHaveBeenCalledTimes(0);
      });
    });

    describe('given register payload: exclude email', () => {
      it('should return 400', async () => {
        const mockRegisterFn = jest.spyOn(authService, 'register');

        const result = await supertest(app)
          .post(`/api/auth/register`)
          .send(lodash.omit(mockRegisterPayload, 'fullName'));

        expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
        expect(JSON.parse(result.text).message).toBe('Validation error: fullName is a required field');
        expect(mockRegisterFn).toHaveBeenCalledTimes(0);
      });
    });

    describe('given register payload: exclude email, password', () => {
      it('should return 400', async () => {
        const mockRegisterFn = jest.spyOn(authService, 'register');

        const result = await supertest(app)
          .post(`/api/auth/register`)
          .send(lodash.omit(mockRegisterPayload, ['email', 'password']));

        expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
        expect(JSON.parse(result.text).message).toBe(
          'Validation error: email is a required field, password is a required field',
        );
        expect(mockRegisterFn).toHaveBeenCalledTimes(0);
      });
    });

    describe('given register payload: exclude email, fullName', () => {
      it('should return 400', async () => {
        const mockRegisterFn = jest.spyOn(authService, 'register');

        const result = await supertest(app)
          .post(`/api/auth/register`)
          .send(lodash.omit(mockRegisterPayload, ['email', 'fullName']));

        expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
        expect(JSON.parse(result.text).message).toBe(
          'Validation error: email is a required field, fullName is a required field',
        );
        expect(mockRegisterFn).toHaveBeenCalledTimes(0);
      });
    });

    describe('given register payload: exclude password, fullName', () => {
      it('should return 400', async () => {
        const mockRegisterFn = jest.spyOn(authService, 'register');

        const result = await supertest(app)
          .post(`/api/auth/register`)
          .send(lodash.omit(mockRegisterPayload, ['password', 'fullName']));

        expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
        expect(JSON.parse(result.text).message).toBe(
          'Validation error: password is a required field, fullName is a required field',
        );
        expect(mockRegisterFn).toHaveBeenCalledTimes(0);
      });
    });

    describe('given register payload: invalid email', () => {
      it('should return 400', async () => {
        const mockRegisterFn = jest.spyOn(authService, 'register');

        const result = await supertest(app)
          .post(`/api/auth/register`)
          .send({ ...mockRegisterPayload, email: 'invalid_email' });

        expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
        expect(JSON.parse(result.text).message).toBe('Validation error: email format is invalid');
        expect(mockRegisterFn).toHaveBeenCalledTimes(0);
      });
    });

    describe('given register payload: invalid password', () => {
      it('should return 400', async () => {
        const mockRegisterFn = jest.spyOn(authService, 'register');

        const result = await supertest(app)
          .post(`/api/auth/register`)
          .send({ ...mockRegisterPayload, password: 'invalid_password' });

        expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
        expect(JSON.parse(result.text).message).toBe('Validation error: password format is invalid');
        expect(mockRegisterFn).toHaveBeenCalledTimes(0);
      });
    });
  });
});
