import { Schema, model } from 'mongoose';
import { Offer } from '../../entities/offer';

const offersSchema = new Schema<Offer>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: { type: String },
  image: {
    publicId: String,
    size: Number,
    width: Number,
    height: Number,
    format: String,
    url: String,
    cloudinaryURL: String,
  },
  description: { type: String },
  regularPrice: { type: Number },
  offerPrice: { type: Number },
  isCoupon: { type: Boolean, default: true },
  coupon: { type: String },
  offerURL: { type: String },
  category: { type: String },
  dateToStart: { type: Number },
  dateToEnd: { type: Number },
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number, default: Date.now() },
});
//  Id: { type: String },
// Image: ImageData;
// image: {type: String},
// Image: {
//   publicId: String,
//   size: Number,
//   width: Number,
//   height: Number,
//   format: String,
//   url: String,
//   cloudinaryURL: String,
// },

offersSchema.set('toJSON', {
  transform(_doc, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export const OfferModel = model<Offer>('Offer', offersSchema, 'offers');
