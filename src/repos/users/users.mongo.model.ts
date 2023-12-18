import { Schema, model } from 'mongoose';
import { User } from '../../entities/user';

const usersSchema = new Schema<User>({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  password: { type: String, required: true },
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number, default: Date.now() },
});

usersSchema.set('toJSON', {
  transform(_doc, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export const UserModel = model<User>('User', usersSchema, 'users');
