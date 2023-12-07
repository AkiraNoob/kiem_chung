import { ObjectSchema, date, object, string } from 'yup';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constant/regex';
import { TGetUserDetailByEmail, TGetUserDetailByIdParam } from '../../types/api/user.types';
import { TUserSchema } from '../../types/schema/user.schema.types';

const createUserDTO: ObjectSchema<TUserSchema> = object({
  fullName: string().required().trim(),
  email: string().required().trim().matches(EMAIL_REGEX, { message: 'email format is invalid' }),
  password: string().required().trim().matches(PASSWORD_REGEX, { message: 'password format is invalid' }),
  dateOfBirth: date().optional(),
  avatar: string().optional(),
})
  .noUnknown(true)
  .strict();

const getUserDetailByIdDTO: ObjectSchema<TGetUserDetailByIdParam> = object({
  userId: string().required().trim(),
})
  .noUnknown(true)
  .strict();

const getUserDetailByEmailDTO: ObjectSchema<TGetUserDetailByEmail> = object({
  email: string().required().trim(),
})
  .noUnknown(true)
  .strict();

export { createUserDTO, getUserDetailByEmailDTO, getUserDetailByIdDTO };
