import { omit } from 'lodash';
import { ValidationError } from 'yup';
import { localLoginDTO, refreshTokenDTO, registerDTO } from '../../../src/api/DTO/auth.dto';
import { TLocalLoginPayload, TRegisterPayload } from '../../../src/types/api/auth.types';
import { TUserSchema } from '../../../src/types/schema/user.schema.types';

const userPayload: TUserSchema = {
  email: 'tester.001@company.com',
  password: 'Tester@001',
  fullName: 'Tester 001',
  avatar: 's3_img_string',
  dateOfBirth: new Date(),
};

const mockRegisterPayload: TRegisterPayload = {
  ...omit(userPayload, ['avatar', 'dateOfBirth']),
  password: 'Tester@001',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockLocalLoginPayload: TLocalLoginPayload = omit(mockRegisterPayload, 'fullName');

const mockRefreshToken = {
  refreshToken: 'refresh_token',
};

describe('Tesing auth DTO', () => {
  describe('Given localLoginDTO', () => {
    describe('Given valid data', () => {
      it('should return data itself', () => {
        return expect(localLoginDTO.validate(mockLocalLoginPayload)).resolves.toBe(mockLocalLoginPayload);
      });
    });

    describe('Given invalid data', () => {
      describe('Given data: omit email', () => {
        it('should return validation error', async () => {
          const invalidData = omit(mockLocalLoginPayload, 'email');

          await expect(localLoginDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(localLoginDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: 'email is a required field' }),
          );
        });
      });

      describe('Given data: invalid email format', () => {
        it('should return validation error', async () => {
          const invalidData = { ...mockLocalLoginPayload, email: 'invalid_email' };

          await expect(localLoginDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(localLoginDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: 'email format is invalid' }),
          );
        });
      });

      describe('Given data: omit password', () => {
        it('should return validation error', async () => {
          const invalidData = omit(mockLocalLoginPayload, 'password');

          await expect(localLoginDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(localLoginDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: 'password is a required field' }),
          );
        });
      });

      describe('Given data: invalid email password', () => {
        it('should return validation error', async () => {
          const invalidData = { ...mockLocalLoginPayload, password: 'invalid_password' };

          await expect(localLoginDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(localLoginDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: 'password format is invalid' }),
          );
        });
      });

      describe('Given data: add aditional property', () => {
        it('should return validation error', async () => {
          const invalidData = { ...mockLocalLoginPayload, idk: 'invalid_field' };

          await expect(localLoginDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(localLoginDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: expect.stringContaining('this field has unspecified keys') }),
          );
        });
      });
    });
  });

  describe('Given registerDTO', () => {
    describe('Given valid data', () => {
      it('should return data itself', () => {
        return expect(registerDTO.validate(mockRegisterPayload)).resolves.toBe(mockRegisterPayload);
      });
    });

    describe('Given invalid data', () => {
      describe('Given data: omit email', () => {
        it('should return validation error', async () => {
          const invalidData = omit(mockRegisterPayload, 'email');

          await expect(registerDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(registerDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: 'email is a required field' }),
          );
        });
      });

      describe('Given data: invalid email format', () => {
        it('should return validation error', async () => {
          const invalidData = { ...mockRegisterPayload, email: 'invalid_email' };

          await expect(registerDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(registerDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: 'email format is invalid' }),
          );
        });
      });

      describe('Given data: omit password', () => {
        it('should return validation error', async () => {
          const invalidData = omit(mockRegisterPayload, 'password');

          await expect(registerDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(registerDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: 'password is a required field' }),
          );
        });
      });

      describe('Given data: invalid email password', () => {
        it('should return validation error', async () => {
          const invalidData = { ...mockRegisterPayload, password: 'invalid_password' };

          await expect(registerDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(registerDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: 'password format is invalid' }),
          );
        });
      });

      describe('Given data: omit fullName', () => {
        it('should return validation error', async () => {
          const invalidData = omit(mockRegisterPayload, 'fullName');

          await expect(registerDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(registerDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: 'fullName is a required field' }),
          );
        });
      });

      describe('Given data: add aditional property', () => {
        it('should return validation error', async () => {
          const invalidData = { ...mockRegisterPayload, idk: 'invalid_field' };

          await expect(registerDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(registerDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: expect.stringContaining('this field has unspecified keys') }),
          );
        });
      });
    });
  });

  describe('Given refreshTokenDTO', () => {
    describe('Given valid data', () => {
      it('should return data itself', () => {
        return expect(refreshTokenDTO.validate(mockRefreshToken)).resolves.toBe(mockRefreshToken);
      });
    });

    describe('Given invalid data', () => {
      describe('Given data: omit refreshToken', () => {
        it('should return validation error', async () => {
          const invalidData = omit(mockRefreshToken, 'refreshToken');

          await expect(refreshTokenDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(refreshTokenDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: 'refreshToken is a required field' }),
          );
        });
      });

      describe('Given data: add aditional property', () => {
        it('should return validation error', async () => {
          const invalidData = { ...mockRefreshToken, idk: 'invalid_field' };

          await expect(registerDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(registerDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: expect.stringContaining('this field has unspecified keys') }),
          );
        });
      });
    });
  });
});
