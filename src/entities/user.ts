import { ImageData } from './img.data';

export type User = {
  id: string;
  userName: string;
  email: string;
  image: ImageData;
  password: string;
  createdAt: number;
  updatedAt: number;
};
