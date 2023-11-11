import jsonWebToken from 'jsonwebtoken';
import { omit } from 'lodash';
import { jestConfigEnv } from '../../.jest/test.config';
import { signJWT, signRefreshJWT, verifyRefreshJWT } from '../../src/common/signJWT';
import { JWTAlgorithm } from '../../src/config/constant';
import AppError from '../../src/constant/error';
import { TJWTPayload } from '../../src/types/api/auth.types';

const jwtPayload: TJWTPayload = {
  id: '123',
  fullName: 'Tester 001',
  email: 'tester.001@company.com',
};

describe('Test common signJWT', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Given signJWT function', () => {
    describe('Given JWT data', () => {
      describe('Given server have .env JWT_EXPIRED and SECRET_KEY', () => {
        it('should return object contain token string and expires string', () => {
          const sypedSign = jest.spyOn(jsonWebToken, 'sign');
          const signedJWT = signJWT(jwtPayload);

          expect(signedJWT).toStrictEqual(
            expect.objectContaining({
              token: expect.any(String),
              expires: expect.any(String),
            }),
          );
          expect(sypedSign).toHaveBeenCalledWith(
            jwtPayload,
            jestConfigEnv.SECRET_KEY,
            expect.objectContaining({
              expiresIn: parseInt(jestConfigEnv.JWT_EXPIRED),
              algorithm: JWTAlgorithm,
            }),
          );
        });
      });

      describe('Given server not have .env JWT_EXPIRED or SECRET_KEY', () => {
        beforeAll(() => {
          jest.resetModules();
          process.env = omit(process.env, 'JWT_EXPIRED');
        });

        afterAll(() => {
          jest.resetModules();
          process.env = jestConfigEnv;
        });

        it('should throw AppError with statusCode 500 and message "Can not read .env"', () => {
          try {
            signJWT(jwtPayload);
          } catch (err) {
            expect(err).toBeInstanceOf(AppError);
          }
        });
      });
    });
  });

  describe('Given signRefreshJWT function', () => {
    describe('Given JWT data', () => {
      describe('Given server have .env REFRESH_JWT_EXPIRED and REFRESH_SECRET_KEY', () => {
        it('should return object contain token string and expires string', () => {
          const signedJWT = signRefreshJWT(jwtPayload);

          expect(signedJWT).toStrictEqual(
            expect.objectContaining({
              token: expect.any(String),
              expires: expect.any(String),
            }),
          );

          expect(
            jsonWebToken.verify(signedJWT.token, jestConfigEnv.REFRESH_SECRET_KEY, {
              algorithms: [JWTAlgorithm],
            }),
          ).toStrictEqual({
            ...jwtPayload,
            iat: expect.any(Number),
            exp: expect.any(Number),
          });
        });
      });

      describe('Given server not have .env REFRESH_JWT_EXPIRED or REFRESH_SECRET_KEY', () => {
        beforeAll(() => {
          jest.resetModules();
          process.env = omit(process.env, 'REFRESH_JWT_EXPIRED');
        });

        afterAll(() => {
          jest.resetModules();
          process.env = jestConfigEnv;
        });

        it('should throw AppError with statusCode 500 and message "Can not read .env"', () => {
          try {
            signRefreshJWT(jwtPayload);
          } catch (err) {
            expect(err).toBeInstanceOf(AppError);
          }
        });
      });
    });
  });

  describe('Given verifyRefreshJWT function', () => {
    let token: string = '';
    beforeAll(() => {
      token = signRefreshJWT(jwtPayload).token;
    });

    describe('Given JWT data', () => {
      describe('Given server have .env REFRESH_SECRET_KEY', () => {
        it('should return object contain jwtPayload with iat and exp number', () => {
          expect(verifyRefreshJWT(token)).toStrictEqual({
            ...jwtPayload,
            iat: expect.any(Number),
            exp: expect.any(Number),
          });
        });
      });

      describe('Given server not have .env REFRESH_SECRET_KEY', () => {
        beforeAll(() => {
          jest.resetModules();
          process.env = omit(process.env, 'REFRESH_SECRET_KEY');
        });

        afterAll(() => {
          jest.resetModules();
          process.env = jestConfigEnv;
        });

        it('should throw AppError with statusCode 500 and message "Can not read .env"', () => {
          try {
            verifyRefreshJWT(token);
          } catch (err) {
            expect(err).toBeInstanceOf(AppError);
          }
        });
      });
    });
  });
});
