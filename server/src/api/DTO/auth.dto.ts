import { ObjectSchema, object, string } from 'yup';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constant/regex';
import { TLocalLoginPayload, TRefreshJWTPayload, TRegisterPayload } from '../../types/api/auth.types';

const localLoginDTO: ObjectSchema<TLocalLoginPayload> = object({
  email: string().required().trim().matches(EMAIL_REGEX, { message: 'email format is invalid' }),
  password: string().required().trim().matches(PASSWORD_REGEX, { message: 'password format is invalid' }),
})
  .noUnknown(true)
  .strict();

const registerDTO: ObjectSchema<TRegisterPayload> = object({
  email: string().required().trim().matches(EMAIL_REGEX, { message: 'email format is invalid' }),
  password: string().required().trim().matches(PASSWORD_REGEX, { message: 'password format is invalid' }),
  fullName: string().required().trim(),
})
  .noUnknown(true)
  .strict();

const refreshTokenDTO: ObjectSchema<TRefreshJWTPayload> = object({
  refreshToken: string().required().trim(),
})
  .noUnknown(true)
  .strict();

export { localLoginDTO, refreshTokenDTO, registerDTO };
