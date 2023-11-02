import mongoose from 'mongoose';
import { EMAIL_REGEX } from '../constant/regex';
import { TUserSchema } from '../types/schema/user.schema.types';

const { Schema } = mongoose;

const userSchema = new Schema<TUserSchema>({
  fullName: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    match: [EMAIL_REGEX, 'Email format is invalid'],
  },
  password: {
    type: String,
    trim: true,
    require: true,
  },
  avatar: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
});

const UserModel = mongoose.model<TUserSchema>('User', userSchema, 'User');

export default UserModel;
