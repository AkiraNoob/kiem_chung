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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('Create user', () => {
    describe('Given valid payload', () => {
      afterEach(async () => {
        await UserModel.deleteMany({ email: userPayload.email });
      });

      describe('Given completed schema payload', () => {
        it('should return status code 200 and user', async () => {
          const spyedUserModelCreate = jest.spyOn(UserModel, 'create');

          await expect(userService.createUser(userPayload)).resolves.toStrictEqual({
            statusCode: EHttpStatus.OK,
            data: expect.objectContaining(omit(userPayload, 'password')),
          });

          return expect(spyedUserModelCreate).toHaveBeenCalledWith(userPayload);
        });
      });

      describe('Given payload omit avatar', () => {
        it('should return status code 200 and user', async () => {
          const spyedUserModelCreate = jest.spyOn(UserModel, 'create');
          const userPayload: TUserSchema = {
            email: 'tester.001@company.com',
            password: bcryptHashSync('Tester@001'),
            fullName: 'Tester 001',
            dateOfBirth: new Date(),
          };

          await expect(userService.createUser(userPayload)).resolves.toStrictEqual({
            statusCode: EHttpStatus.OK,
            data: expect.objectContaining(omit(userPayload, 'password')),
          });
          return expect(spyedUserModelCreate).toHaveBeenCalledWith(userPayload);
        });
      });

      describe('Given payload omit dateOfBirth', () => {
        it('should return status code 200 and user', async () => {
          const spyedUserModelCreate = jest.spyOn(UserModel, 'create');
          const userPayload: TUserSchema = {
            email: 'tester.001@company.com',
            password: bcryptHashSync('Tester@001'),
            fullName: 'Tester 001',
            avatar: 's3_img_string',
          };

          await expect(userService.createUser(userPayload)).resolves.toStrictEqual({
            statusCode: EHttpStatus.OK,
            data: expect.objectContaining(omit(userPayload, 'password')),
          });
          return expect(spyedUserModelCreate).toHaveBeenCalledWith(userPayload);
        });
      });
    });

    describe('Given invalid payload', () => {
      describe('Empty fullName', () => {
        it('should throw ValidationError error', async () => {
          return expect(userService.createUser({ ...userPayload, fullName: '' })).rejects.toBeInstanceOf(
            mongoose.Error.ValidationError,
          );
        });
      });

      describe('Empty email', () => {
        it('should throw ValidationError error', async () => {
          return expect(userService.createUser({ ...userPayload, email: '' })).rejects.toBeInstanceOf(
            mongoose.Error.ValidationError,
          );
        });
      });

      describe('Empty password', () => {
        it('should throw ValidationError error', async () => {
          return expect(userService.createUser({ ...userPayload, password: '' })).rejects.toBeInstanceOf(
            mongoose.Error.ValidationError,
          );
        });
      });
    });
  });

  describe('Get user by id', () => {
    let userId: string = '';

    beforeAll(async () => {
      userId = (await UserModel.create(userPayload))._id.toString();
    });

    afterAll(async () => {
      await UserModel.findByIdAndDelete(userId);
    });

    describe('Given valid payload', () => {
      it('should return status code 200 and user', async () => {
        const spyedUserModelFindById = jest.spyOn(UserModel, 'findById');

        await expect(userService.getUserById({ userId })).resolves.toStrictEqual({
          statusCode: EHttpStatus.OK,
          data: expect.objectContaining(omit(userPayload, 'password')),
        });

        return expect(spyedUserModelFindById).toHaveBeenCalledWith({ _id: userId });
      });
    });

    describe('Given invalid payload', () => {
      describe('Not exists but valid format userId', () => {
        it('should return status code 200 and null', async () => {
          const notExistUserId: string = new mongoose.Types.ObjectId().toString();

          return expect(userService.getUserById({ userId: notExistUserId })).resolves.toStrictEqual({
            statusCode: EHttpStatus.OK,
            data: null,
          });
        });
      });

      describe('Invalid format but not empty userId', () => {
        it('should return CastError error', async () => {
          return expect(userService.getUserById({ userId: '123' })).rejects.toBeInstanceOf(mongoose.Error.CastError);
        });
      });

      describe('Empty userId', () => {
        it('should return CastError error', async () => {
          return expect(userService.getUserById({ userId: '' })).rejects.toBeInstanceOf(mongoose.Error.CastError);
        });
      });
    });
  });

  describe('Get user by email', () => {
    beforeAll(async () => {
      await UserModel.create(userPayload);
    });

    afterAll(async () => {
      await UserModel.deleteMany({ email: userPayload.email });
    });

    describe('Given valid payload', () => {
      it('should return status code 200 and user', async () => {
        const spyedUserModelFindOne = jest.spyOn(UserModel, 'findOne');

        await expect(userService.getUserByEmail({ email: userPayload.email })).resolves.toStrictEqual({
          statusCode: EHttpStatus.OK,
          data: expect.objectContaining(omit(userPayload, 'password')),
        });

        return expect(spyedUserModelFindOne).toHaveBeenCalledWith({
          email: userPayload.email,
        });
      });
    });

    describe('Given invalid payload', () => {
      describe('Not exists but valid format email', () => {
        it('should return status code 200 and null', async () => {
          const spyedUserModelFindOne = jest.spyOn(UserModel, 'findOne');
          await expect(userService.getUserByEmail({ email: 'non.exist@company.com' })).resolves.toStrictEqual(
            expect.objectContaining({
              statusCode: EHttpStatus.OK,
              data: null,
            }),
          );

          expect(spyedUserModelFindOne).toHaveBeenCalledWith({
            email: 'non.exist@company.com',
          });
        });
      });

      describe('Invalid email', () => {
        it('should return status code 200 and null', async () => {
          const spyedUserModelFindOne = jest.spyOn(UserModel, 'findOne');
          expect.assertions(2);
          await expect(userService.getUserByEmail({ email: '' })).resolves.toStrictEqual({
            statusCode: EHttpStatus.OK,
            data: null,
          });
          expect(spyedUserModelFindOne).toHaveBeenCalledWith({
            email: '',
          });
        });
      });
    });
  });

  describe('Get me', () => {
    beforeAll(async () => {
      await UserModel.create(userPayload);
    });

    afterAll(async () => {
      await UserModel.deleteMany({ email: userPayload.email });
    });

    describe('Given valid payload', () => {
      it('should return status code 200 and user', async () => {
        const spyedUserModelFindOne = jest.spyOn(UserModel, 'findOne');

        await expect(userService.getMe(userPayload)).resolves.toStrictEqual({
          statusCode: EHttpStatus.OK,
          data: expect.objectContaining(omit(userPayload, 'password')),
        });

        return expect(spyedUserModelFindOne).toHaveBeenCalledWith({
          email: userPayload.email,
        });
      });
    });

    describe('Given invalid payload', () => {
      describe('Not exists user', () => {
        it('should return status code 400 and message "User not found"', async () => {
          const spyedUserModelFindOne = jest.spyOn(UserModel, 'findOne');
          await expect(userService.getMe({ ...userPayload, email: 'non.exist@company.com' })).rejects.toStrictEqual(
            expect.objectContaining({
              statusCode: EHttpStatus.NOT_FOUND,
              message: 'User not found',
            }),
          );

          expect(spyedUserModelFindOne).toHaveBeenCalledWith({
            email: 'non.exist@company.com',
          });
        });
      });
    });
  });
});
