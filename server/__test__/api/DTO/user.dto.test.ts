import { omit } from 'lodash';
import mongoose from 'mongoose';
import { ValidationError } from 'yup';
import { createUserDTO, getUserDetailByEmailDTO, getUserDetailByIdDTO } from '../../../src/api/DTO/user.dto';
import { TGetUserDetailByEmail, TGetUserDetailByIdParam } from '../../../src/types/api/user.types';
import { TUserSchema } from '../../../src/types/schema/user.schema.types';

const userPayload: TUserSchema = {
  email: 'tester.001@company.com',
  password: 'Tester@001',
  fullName: 'Tester 001',
  avatar: 's3_img_string',
  dateOfBirth: new Date(),
};

const mockGetUserDetailByIdData: TGetUserDetailByIdParam = {
  userId: new mongoose.Types.ObjectId().toString(),
};

const mockGetUserDetailByEmailData: TGetUserDetailByEmail = {
  email: 'tester.001@company.com',
};

describe('Tesing user DTO', () => {
  describe('Given createUserDTO', () => {
    describe('Given valid data', () => {
      describe('Given completed valid data', () => {
        it('should return data itself', () => {
          return expect(createUserDTO.validate(userPayload)).resolves.toBe(userPayload);
        });
      });

      describe('Given valid data omit dateOfBirth', () => {
        it('should return data itself', () => {
          const omitDateOfBirthData = omit(userPayload, 'dateOfBirth');
          return expect(createUserDTO.validate(omitDateOfBirthData)).resolves.toBe(omitDateOfBirthData);
        });
      });

      describe('Given valid data omit avatar', () => {
        it('should return data itself', () => {
          const omitAvatarData = omit(userPayload, 'avatar');
          return expect(createUserDTO.validate(omitAvatarData)).resolves.toBe(omitAvatarData);
        });
      });
    });

    describe('Given invalid data', () => {
      describe('Given data: omit email', () => {
        it('should return validation error', async () => {
          const invalidData = omit(userPayload, 'email');

          await expect(createUserDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(createUserDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: 'email is a required field' }),
          );
        });
      });

      describe('Given data: invalid email format', () => {
        it('should return validation error', async () => {
          const invalidData = { ...userPayload, email: 'invalid_email' };

          await expect(createUserDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(createUserDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: 'email format is invalid' }),
          );
        });
      });

      describe('Given data: omit password', () => {
        it('should return validation error', async () => {
          const invalidData = omit(userPayload, 'password');

          await expect(createUserDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(createUserDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: 'password is a required field' }),
          );
        });
      });

      describe('Given data: invalid email password', () => {
        it('should return validation error', async () => {
          const invalidData = { ...userPayload, password: 'invalid_password' };

          await expect(createUserDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(createUserDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: 'password format is invalid' }),
          );
        });
      });

      describe('Given data: omit fullName', () => {
        it('should return validation error', async () => {
          const invalidData = omit(userPayload, 'fullName');

          await expect(createUserDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(createUserDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: 'fullName is a required field' }),
          );
        });
      });

      describe('Given data: add aditional property', () => {
        it('should return validation error', async () => {
          const invalidData = { ...userPayload, idk: 'invalid_field' };

          await expect(createUserDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(createUserDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: expect.stringContaining('this field has unspecified keys') }),
          );
        });
      });
    });
  });

  describe('Given getUserDetailByEmailDTO', () => {
    describe('Given valid data', () => {
      it('should return data itself', () => {
        return expect(getUserDetailByEmailDTO.validate(mockGetUserDetailByEmailData)).resolves.toBe(
          mockGetUserDetailByEmailData,
        );
      });
    });

    describe('Given invalid data', () => {
      describe('Given data: omit email', () => {
        it('should return validation error', async () => {
          const invalidData = omit(mockGetUserDetailByEmailData, 'email');

          await expect(getUserDetailByEmailDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(getUserDetailByEmailDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: 'email is a required field' }),
          );
        });
      });

      describe('Given data: add aditional property', () => {
        it('should return validation error', async () => {
          const invalidData = { ...mockGetUserDetailByEmailData, idk: 'invalid_field' };

          await expect(getUserDetailByEmailDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(getUserDetailByEmailDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: expect.stringContaining('this field has unspecified keys') }),
          );
        });
      });
    });
  });

  describe('Given getUserDetailByIdDTO', () => {
    describe('Given valid data', () => {
      it('should return data itself', () => {
        return expect(getUserDetailByIdDTO.validate(mockGetUserDetailByIdData)).resolves.toBe(
          mockGetUserDetailByIdData,
        );
      });
    });

    describe('Given invalid data', () => {
      describe('Given data: omit userId', () => {
        it('should return validation error', async () => {
          const invalidData = omit(mockGetUserDetailByIdData, 'userId');

          await expect(getUserDetailByIdDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(getUserDetailByIdDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: 'userId is a required field' }),
          );
        });
      });

      describe('Given data: add aditional property', () => {
        it('should return validation error', async () => {
          const invalidData = { ...mockGetUserDetailByIdData, idk: 'invalid_field' };

          await expect(getUserDetailByEmailDTO.validate(invalidData)).rejects.toBeInstanceOf(ValidationError);
          return expect(getUserDetailByEmailDTO.validate(invalidData)).rejects.toEqual(
            expect.objectContaining({ message: expect.stringContaining('this field has unspecified keys') }),
          );
        });
      });
    });
  });
});
