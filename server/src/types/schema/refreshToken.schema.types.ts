import { ObjectId } from 'mongoose';

export type TRefreshTokenSchema = {
  userId: ObjectId;
  refreshToken: string;
  expiredAt: Date;
};
