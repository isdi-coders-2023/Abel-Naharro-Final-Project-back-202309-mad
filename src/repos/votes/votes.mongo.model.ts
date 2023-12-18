import { Schema, model } from 'mongoose';
import { Vote } from '../../entities/vote';

const votesSchema = new Schema<Vote>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  offer: {
    type: Schema.Types.ObjectId,
    ref: 'Offer',
  },
  isPositive: { type: Boolean, required: true },
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number, default: Date.now() },
});

votesSchema.set('toJSON', {
  transform(_doc, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export const VoteModel = model<Vote>('Vote', votesSchema, 'votes');
