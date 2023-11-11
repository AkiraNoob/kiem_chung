import { omit } from 'lodash';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import userService from '../../../src/api/service/user.service';
import { bcryptHashSync } from '../../../src/common/bcrypt';
import { EHttpStatus } from '../../../src/constant/statusCode';
import UserModel from '../../../src/model/user';
import { TUserSchema } from '../../../src/types/schema/user.schema.types';

const userPayload: TUserSchema = {
  email: 'tester.001@company.com',
  password: bcryptHashSync('Tester@001'),
  fullName: 'Tester 001',
  avatar: 's3_img_string',
  dateOfBirth: new Date(),
};

describe('Testing user service', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('Create user', () => {
    afterEach(async () => {
      await UserModel.deleteMany({ email: userPayload.email });
    });

    describe('Given valid payload', () => {
      describe('Given completed schema payload', () => {
        it('should return status code 200 and user', async () => {
          const result = await userService.createUser(userPayload);
          expect(result.statusCode).toBe(EHttpStatus.OK);
          expect(result.data).toStrictEqual(
            expect.objectContaining({
              email: expect.any(String),
              password: expect.any(String),
              fullName: expect.any(String),
            }),
          );
        });
      });

      describe('Given payload omit avatar', () => {
        it('should return status code 200 and user', async () => {
          const result = await userService.createUser(omit(userPayload, 'avatar'));
          expect(result.statusCode).toBe(EHttpStatus.OK);
          expect(result.data).toStrictEqual(
            expect.objectContaining({
              email: expect.any(String),
              password: expect.any(String),
              fullName: expect.any(String),
            }),
          );
        });
      });

      describe('Given payload omit dateOfBirth', () => {
        it('should return status code 200 and user', async () => {
          const result = await userService.createUser(omit(userPayload, 'dateOfBirth'));
          expect(result.statusCode).toBe(EHttpStatus.OK);
          expect(result.data).toStrictEqual(
            expect.objectContaining({
              email: expect.any(String),
              password: expect.any(String),
              fullName: expect.any(String),
            }),
          );
        });
      });

      describe('Given payload omit avatar, dateOfBirth', () => {
        it('should return status code 200 and user', async () => {
          const result = await userService.createUser(omit(userPayload, ['dateOfBirth', 'avatar']));
          expect(result.statusCode).toBe(EHttpStatus.OK);
          expect(result.data).toStrictEqual(
            expect.objectContaining({
              email: expect.any(String),
              password: expect.any(String),
              fullName: expect.any(String),
            }),
          );
        });
      });
    });

    describe('Given invalid payload', () => {
      describe('Empty fullName', () => {
        it('should throw ValidationError error', async () => {
          try {
            await userService.createUser({ ...userPayload, fullName: '' });
          } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
          }
        });
      });

      describe('Empty email', () => {
        it('should throw ValidationError error', async () => {
          try {
            await userService.createUser({ ...userPayload, email: '' });
          } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
          }
        });
      });

      describe('Empty password', () => {
        it('should throw ValidationError error', async () => {
          try {
            await userService.createUser({ ...userPayload, password: '' });
          } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
          }
        });
      });
    });
  });

  describe('Get user by id', () => {
    let userId: string = '';

    beforeAll(async () => {
      const result = await UserModel.create({ ...userPayload, password: bcryptHashSync(userPayload.password) });
      userId = result._id.toString();
    });

    afterAll(async () => {
      await UserModel.deleteMany({ _id: userId });
    });

    describe('Given valid payload', () => {
      it('should return status code 200 and user', async () => {
        const result = await userService.getUserById({ userId });

        expect(result.statusCode).toBe(EHttpStatus.OK);
        expect(result.data).toStrictEqual(
          expect.objectContaining({
            email: expect.any(String),
            fullName: expect.any(String),
          }),
        );
      });
    });

    describe('Given invalid payload', () => {
      describe('Not exists but valid format userId', () => {
        it('should return status code 200 and null', async () => {
          const notExistUserId: string = new mongoose.Types.ObjectId().toString();

          const result = await userService.getUserById({ userId: notExistUserId });

          expect(result.statusCode).toBe(EHttpStatus.OK);
          expect(result.data).toBeNull();
        });
      });

      describe('Invalid format but not empty userId', () => {
        it('should return CastError error', async () => {
          try {
            const invalidUserId: string = '123';
            await userService.getUserById({ userId: invalidUserId });
          } catch (err) {
            expect(err).toBeInstanceOf(mongoose.Error.CastError);
          }
        });
      });

      describe('Empty userId', () => {
        it('should return CastError error', async () => {
          try {
            const emptyUserId: string = '';
            await userService.getUserById({ userId: emptyUserId });
          } catch (err) {
            expect(err).toBeInstanceOf(mongoose.Error.CastError);
          }
        });
      });
    });
  });

  describe('Get user by email', () => {
    let email: string = '';

    beforeAll(async () => {
      const result = await UserModel.create({ ...userPayload, password: bcryptHashSync(userPayload.password) });
      email = result.email.toString();
    });

    afterAll(async () => {
      await UserModel.deleteMany({ email });
    });

    describe('Given valid payload', () => {
      it('should return status code 200 and user', async () => {
        const result = await userService.getUserByEmail({ email });

        expect(result.statusCode).toBe(EHttpStatus.OK);
        expect(result.data).toStrictEqual(
          expect.objectContaining({
            email: expect.any(String),
            fullName: expect.any(String),
          }),
        );
      });
    });

    describe('Given invalid payload', () => {
      describe('Not exists but valid format email', () => {
        it('should return status code 200 and null', async () => {
          const notExistUserEmail: string = 'lorem@ipsum.com';
          const result = await userService.getUserByEmail({ email: notExistUserEmail });

          expect(result.statusCode).toBe(EHttpStatus.OK);
          expect(result.data).toBeNull();
        });
      });

      describe('Empty email', () => {
        it('should return CastError error', async () => {
          try {
            const emptyEmail: string = '';
            await userService.getUserByEmail({ email: emptyEmail });
          } catch (err) {
            expect(err).toBeInstanceOf(mongoose.Error.CastError);
          }
        });
      });
    });
  });
});
