import mongoose, { Types } from 'mongoose';
import { TRefreshTokenSchema } from '../types/schema/refreshToken.schema.types';

const { Schema } = mongoose;

export const refreshTokenSchema = new Schema<TRefreshTokenSchema>({
  refreshToken: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: Types.ObjectId,
    required: true,
    trim: true,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
});

const RefreshTokenModel = mongoose.model<TRefreshTokenSchema>('RefreshToken', refreshTokenSchema, 'RefreshToken');

export default RefreshTokenModel;
