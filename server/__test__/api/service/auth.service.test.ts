import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { omit } from 'lodash';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import authService from '../../../src/api/service/auth.service';
import * as bcryptCommon from '../../../src/common/bcrypt';
import { TReturnJWTType, signRefreshJWT } from '../../../src/common/signJWT';
import { EHttpStatus } from '../../../src/constant/statusCode';
import RefreshTokenModel from '../../../src/model/refreshToken';
import UserModel from '../../../src/model/user';
import { TLocalLoginPayload, TRegisterPayload } from '../../../src/types/api/auth.types';
import { TUserSchema } from '../../../src/types/schema/user.schema.types';

const generateMockPayload = () => {
  const userPayload: TUserSchema = {
    email: 'tester.001@company.com',
    password: bcryptCommon.bcryptHashSync('Tester@001'),
    fullName: 'Tester 001',
    avatar: 's3_img_string',
    dateOfBirth: new Date(),
  };

  const mockRegisterPayload: TRegisterPayload = {
    ...omit(userPayload, ['avatar', 'dateOfBirth']),
    password: 'Tester@001',
  };

  const mockLocalLoginPayload: TLocalLoginPayload = omit(mockRegisterPayload, 'fullName');

  return {
    userPayload,
    mockRegisterPayload,
    mockLocalLoginPayload,
  };
};

describe('Testing auth service', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('Login with email and password service', () => {
    beforeAll(async () => {
      const { userPayload } = generateMockPayload();
      await UserModel.create(userPayload);
    });

    afterAll(async () => {
      const { userPayload } = generateMockPayload();
      await UserModel.deleteMany({ email: userPayload.email });
    });

    describe('Given valid payload', () => {
      const { mockLocalLoginPayload } = generateMockPayload();

      const spyedRefreshCreate = jest.spyOn(RefreshTokenModel, 'create');
      const spyedRefreshDelete = jest.spyOn(RefreshTokenModel, 'deleteMany');
      const spyedFindUser = jest.spyOn(UserModel, 'findOne');
      const spyedBcryptCompare = jest.spyOn(bcryptCommon, 'bcryptCompareSync');

      afterEach(() => {
        jest.clearAllMocks();
      });

      it.only('should return statusCode 200 and data should contain {token, refreshToken} and message is "Login successfully"', async () => {
        const data = {
          token: {
            token: expect.any(String),
            expires: expect.any(String),
          },
          refreshToken: {
            token: expect.any(String),
            expires: expect.any(String),
          },
        };

        await expect(authService.loginWithEmailAndPassword(mockLocalLoginPayload)).resolves.toStrictEqual({
          statusCode: EHttpStatus.OK,
          data,
          message: expect.stringMatching('Login successfully'),
        });

        expect(spyedBcryptCompare).toHaveBeenCalledWith(mockLocalLoginPayload.password, expect.any(String));
        expect(spyedBcryptCompare).toHaveReturnedWith(true);

        expect(spyedFindUser).toHaveBeenCalledWith({
          email: expect.any(String),
        });

        expect(spyedRefreshDelete).toHaveBeenCalledWith({
          userId: expect.any(mongoose.Types.ObjectId),
        });

        return expect(spyedRefreshCreate).toHaveBeenCalledWith({
          userId: expect.any(mongoose.Types.ObjectId),
          refreshToken: expect.any(String),
          expiredAt: expect.any(String),
        });
      });
    });

    describe('Given invalid payload', () => {
      describe('Given non-exist email', () => {
        afterEach(() => {
          jest.clearAllMocks();
        });

        it.only('should return statusCode 400 and message is "Wrong email"', async () => {
          const { mockLocalLoginPayload } = generateMockPayload();

          const nonExistEmail = 'LoremIpsum';
          const mockLocalLoginPayloadInvalidEmail = { ...mockLocalLoginPayload, email: nonExistEmail };

          return expect(authService.loginWithEmailAndPassword(mockLocalLoginPayloadInvalidEmail)).rejects.toEqual(
            expect.objectContaining({
              statusCode: EHttpStatus.BAD_REQUEST,
              message: 'Wrong email',
            }),
          );
        });
      });

      describe('Given wrong password', () => {
        afterEach(() => {
          jest.clearAllMocks();
        });

        it.only('should return statusCode 400 and message is "Wrong password"', async () => {
          const { mockLocalLoginPayload } = generateMockPayload();

          const spyedBcryptCompare = jest.spyOn(bcryptCommon, 'bcryptCompareSync');
          const wrongPassword = 'WrongPassword';
          const mockLocalLoginPayloadInvalidEmail = { ...mockLocalLoginPayload, password: wrongPassword };

          await expect(authService.loginWithEmailAndPassword(mockLocalLoginPayloadInvalidEmail)).rejects.toEqual(
            expect.objectContaining({
              statusCode: EHttpStatus.BAD_REQUEST,
              message: 'Wrong password',
            }),
          );

          expect(spyedBcryptCompare).toHaveBeenCalledWith('WrongPassword', expect.any(String));
          return expect(spyedBcryptCompare).toHaveReturnedWith(false);
        });
      });
    });
  });

  describe('Register service', () => {
    afterAll(async () => {
      const { userPayload } = generateMockPayload();

      await UserModel.deleteMany({ email: userPayload.email });
    });

    describe('Given valid payload', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });

      it.only('should return statusCode 200 and data is null and message is "Register successfully"', async () => {
        const { mockRegisterPayload } = generateMockPayload();

        const spyedUserModelCreate = jest.spyOn(UserModel, 'create');
        const resolveData = {
          statusCode: EHttpStatus.OK,
          data: null,
          message: expect.stringMatching('Register successfully'),
        };

        await expect(authService.register(mockRegisterPayload)).resolves.toStrictEqual(resolveData);
        return expect(spyedUserModelCreate).toHaveBeenCalledWith({
          ...mockRegisterPayload,
          password: expect.any(String),
        });
      });
    });

    describe('Given invalid payload', () => {
      describe('Given exist email', () => {
        afterEach(() => {
          jest.clearAllMocks();
        });

        it.only('should return error is instanceOf MongoServerError and message contains "duplicate key error collection"', async () => {
          const { mockRegisterPayload } = generateMockPayload();
          await expect(authService.register(mockRegisterPayload)).rejects.toBeInstanceOf(
            mongoose.mongo.MongoServerError,
          );
          return expect(authService.register(mockRegisterPayload)).rejects.toEqual(
            expect.objectContaining({ message: expect.stringContaining('duplicate key error collection') }),
          );
        });
      });

      describe('Given invalid email format', () => {
        afterEach(() => {
          jest.clearAllMocks();
        });

        it.only('should return error is instanceOf MongoServerError and message "Email format is invalid', async () => {
          const { mockRegisterPayload } = generateMockPayload();
          const invalidEmailFormat = 'LoremIpsum';
          const mockLocalLoginPayloadInvalidEmail = { ...mockRegisterPayload, email: invalidEmailFormat };

          await expect(authService.register(mockLocalLoginPayloadInvalidEmail)).rejects.toBeInstanceOf(
            mongoose.Error.ValidationError,
          );
          return expect(authService.register(mockLocalLoginPayloadInvalidEmail)).rejects.toEqual(
            expect.objectContaining({ message: expect.stringContaining('Email format is invalid') }),
          );
        });
      });
    });
  });

  describe('Refresh token service', () => {
    let refreshToken: TReturnJWTType = { token: '', expires: '' };
    let userData: { id: string; email: string; fullName: string } = { id: '', email: '', fullName: '' };

    beforeAll(async () => {
      const { userPayload } = generateMockPayload();
      const user = await UserModel.create(userPayload);

      userData = {
        id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
      };

      refreshToken = signRefreshJWT(userData);
    });

    describe('Given valid payload', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });

      it.only('should return statusCode 200 and data should contain {token, refreshToken} and message is "Refreshed token successfully"', async () => {
        const spyedRefreshCreate = jest.spyOn(RefreshTokenModel, 'create');
        const spyedRefreshDelete = jest.spyOn(RefreshTokenModel, 'deleteMany');

        const data = {
          token: {
            token: expect.any(String),
            expires: expect.any(String),
          },
          refreshToken: {
            token: expect.any(String),
            expires: expect.any(String),
          },
        };

        await expect(authService.refreshToken(refreshToken.token)).resolves.toStrictEqual({
          statusCode: EHttpStatus.OK,
          data,
          message: 'Refreshed token successfully',
        });

        expect(spyedRefreshDelete).toHaveBeenCalledWith({
          userId: expect.any(mongoose.Types.ObjectId),
        });

        return expect(spyedRefreshCreate).toHaveBeenCalledWith({
          userId: expect.any(String),
          refreshToken: expect.any(String),
          expiredAt: expect.any(String),
        });
      });
    });

    describe('Given invalid payload', () => {
      describe('Given invalid jwt', () => {
        afterEach(() => {
          jest.clearAllMocks();
        });

        it.only('should return error is instanceOf JsonWebTokenError', async () => {
          return expect(authService.refreshToken('invalid_refresh_token')).rejects.toBeInstanceOf(JsonWebTokenError);
        });
      });

      describe('Given expired jwt', () => {
        beforeAll(async () => {
          jest.resetModules();
          process.env.REFRESH_JWT_EXPIRED = '0';
          refreshToken = signRefreshJWT(userData);
        });

        afterEach(() => {
          jest.clearAllMocks();
        });

        it.only('should return error is instanceOf TokenExpiredError', async () => {
          return expect(authService.refreshToken(refreshToken.token)).rejects.toBeInstanceOf(TokenExpiredError);
        });
      });
    });
  });
});
