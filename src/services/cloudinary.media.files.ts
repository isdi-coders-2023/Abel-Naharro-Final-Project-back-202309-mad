/* eslint-disable camelcase */
import { v2 as cloudinary } from 'cloudinary';
import createDebug from 'debug';
import { ImageData } from '../entities/img.data';
import { HttpError } from '../types/http.error.js';

const debugServer = createDebug('LOG:SERVICE:CLOUDINARY-MEDIA-FILES');

export class CloudinaryMediaFiles {
  constructor() {
    cloudinary.config({
      secure: true,
    });
    debugServer('Instantiated: CloudinaryMediaFiles');
    debugServer('Cloudinary config:', cloudinary.config());
  }

  uploadImage = async (filePath: string) => {
    try {
      const uploadApiResponse = await cloudinary.uploader.upload(filePath, {
        use_filename: true,
        unique_filename: false,
        folder: 'image-offers',
        overwrite: true,
        format: 'webp',
      });

      const imgData: ImageData = {
        url: uploadApiResponse.url,
        publicId: uploadApiResponse.public_id,
        size: uploadApiResponse.bytes,
        width: uploadApiResponse.width,
        height: uploadApiResponse.height,
        format: uploadApiResponse.format,
      };

      return imgData;
    } catch (err) {
      const error = err as Error;
      throw new HttpError(406, 'Not Acceptable', error.message);
    }
  };
}
