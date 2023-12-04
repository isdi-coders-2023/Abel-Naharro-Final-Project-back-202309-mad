import { User } from './user';
import { ImageData } from './img.data';

export type Offer = {
  id: string;
  author: User;
  title: string;
  image: ImageData;
  description: string;
  regularPrice: number;
  offerPrice: number;
  isCoupon: boolean;
  coupon: string;
  offerURL: string;
  category: string;
  dateToStart: number;
  dateToEnd: number;
  createdAt: number;
  updatedAt: number;
};
