import { omit } from 'lodash';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { bcryptHashSync } from '../../../src/common/bcrypt';
import { EHttpStatus } from '../../../src/constant/statusCode';
import appLoader from '../../../src/loader/appLoader';
import UserModel from '../../../src/model/user';
import { TUserSchema } from '../../../src/types/schema/user.schema.types';

const app = appLoader();
const request = supertest.agent(app);
request.withCredentials(true);

describe('Testing /api/user', () => {
  let mongoServerSingletonUri: string = '';

  const mockUser: TUserSchema = {
    email: 'tester.001@company.com',
    password: 'Tester@001',
    fullName: 'Tester 001',
  };

  let userId: string = '';

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    mongoServerSingletonUri = mongoServer.getUri();
    await mongoose.connect(mongoServerSingletonUri);
    //create 1 exist user
    const user = await UserModel.create({ ...mockUser, password: bcryptHashSync(mockUser.password) });
    userId = user._id.toString();
  });

  afterAll(async () => {
    await UserModel.deleteMany({ email: mockUser.email });
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('GET /:userId', () => {
    let token: string = '';
    describe('given invalid input', () => {
      describe('given unauthenticated data', () => {
        describe('given not logined user', () => {
          it('should return status 401 and message "Invalid Credentials"', async () => {
            const result = await request.get(`/api/user/${userId}`);

            expect(result.statusCode).toBe(EHttpStatus.UNAUTHORIZED);
            expect(result.body.message).toBe('Invalid Credentials');
          });
        });

        describe('given user have expired token', () => {
          it('should return status 401 and message "Invalid Credentials"', async () => {
            const result = await request.get(`/api/user/${userId}`);

            expect(result.statusCode).toBe(EHttpStatus.UNAUTHORIZED);
            expect(result.body.message).toBe('Invalid Credentials');
          });
        });
      });

      describe('given invalid format ObjectId userId param', () => {
        let token: string = '';
        beforeAll(async () => {
          const { headers } = await request.post(`/api/auth/login`).send(omit(mockUser, 'fullName'));
          token = headers['set-cookie'][0];
        });

        it('should return status 400', async () => {
          const result = await request.get(`/api/user/undefined`).set('Cookie', token);
          expect(result.statusCode).toBe(EHttpStatus.BAD_REQUEST);
        });
      });
    });

    describe('given valid input', () => {
      beforeAll(async () => {
        const { headers } = await request.post(`/api/auth/login`).send(omit(mockUser, 'fullName'));
        token = headers['set-cookie'][0];
      });

      it('should return status 200 and object user', async () => {
        const result = await request.get(`/api/user/${userId}`).set('Cookie', token);
        expect(result.statusCode).toBe(EHttpStatus.OK);
        expect(result.body.data).toHaveProperty('_id', userId);
        expect(result.body.data).toHaveProperty('fullName', mockUser.fullName);
        expect(result.body.data).toHaveProperty('email', mockUser.email);
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
        const result = await request.get(`/api/user/${userId}`).set('Cookie', token);

        expect(result.statusCode).toBe(EHttpStatus.INTERNAL_SERVER_ERROR);
      });
    });
  });
});
