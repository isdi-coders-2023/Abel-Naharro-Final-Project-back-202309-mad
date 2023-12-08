import { User } from './user';
import { Offer } from './offer';

export type Vote = {
  id: string;
  user: User;
  offer: Offer;
  isPositive: boolean;
  createdAt: number;
  updatedAt: number;
};
