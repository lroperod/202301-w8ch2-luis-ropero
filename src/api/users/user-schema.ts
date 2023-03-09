import moongose, { Schema } from 'mongoose';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  imgUrl: string;
}

const userSchema = new Schema<User>({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  imgUrl: String,
});

export const UserModel = moongose.model<User>('User', userSchema, 'users');
