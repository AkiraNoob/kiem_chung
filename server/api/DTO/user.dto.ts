import { ObjectSchema, date, object, string } from 'yup';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constant/regex';
import { TGetUserDetailParam } from '../../types/api/user.types';
import { TUserSchema } from '../../types/schema/user.schema.types';

const createUserDTO: ObjectSchema<TUserSchema> = object({
  fullName: string().required().trim(),
  email: string().required().trim().matches(EMAIL_REGEX, { message: 'Email format is invalid' }),
  password: string().required().trim().matches(PASSWORD_REGEX, { message: 'Password format is invalid' }),
  dateOfBirth: date().optional(),
  avatar: string().optional(),
});

const getUserDetailDTO: ObjectSchema<TGetUserDetailParam> = object({
  userId: string().required(),
});

export { createUserDTO, getUserDetailDTO };
