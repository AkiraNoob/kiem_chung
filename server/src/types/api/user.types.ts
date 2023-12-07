import { TUserSchema } from '../schema/user.schema.types';

export type TGetUserDetailByIdParam = {
  userId: string;
};

export type TGetUserDetailByEmail = {
  email: string;
};

export type TGetUserDetailByIdDataResponse = Omit<TUserSchema, 'password'>;
