// Import { ImageData } from './img.data';

export type LoginUser = {
  email: string;
  password: string;
};

export type User = LoginUser & {
  id: string;
  userName: string;
  // Image: ImageData;
  image: string;
  createdAt: number;
  updatedAt: number;
};
