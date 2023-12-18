/* eslint-disable camelcase */
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryMediaFiles } from './cloudinary.media.files.js';
// Import { HttpError } from '../types/http.error.js';
describe('Given the Media File class', () => {
  describe('When I use upload a image', () => {
    test('should upload an image successfully when given a valid imagePath', async () => {
      const imagePath = 'public/img/path.jpg';
      const uploadApiResponse = {
        url: 'https://example.com/image.jpg',
        public_id: 'public_id',
        bytes: 1000,
        height: 500,
        width: 500,
        format: 'webp',
        folder: 'image-offers',
      };
      cloudinary.uploader.upload = jest
        .fn()
        .mockResolvedValue(uploadApiResponse);
      const mediaFiles = new CloudinaryMediaFiles();
      const result = await mediaFiles.uploadImage(imagePath);
      expect(cloudinary.uploader.upload).toHaveBeenCalledWith(imagePath, {
        use_filename: true,
        unique_filename: false,
        folder: 'image-offers',
        overwrite: true,
        format: 'webp',
      });
      expect(result).toEqual({
        url: 'https://example.com/image.jpg',
        publicId: 'public_id',
        size: 1000,
        height: 500,
        width: 500,
        format: 'webp',
      });
    });
    // Test('should handle cloudinary API errors when image upload fails', async () => {
    //   const imagePath = 'valid/image/path.jpg';
    //   const error = new Error('Upload failed');
    //   cloudinary.uploader.upload = jest.fn().mockRejectedValue(error);
    //   const mediaFiles = new CloudinaryMediaFiles();
    //   try {
    //     await mediaFiles.uploadImage(imagePath);
    //     throw new HttpError(
    //       406,
    //       'Error uploading image to Cloudinary',
    //       (error as Error).message
    //     );
    //   } catch (error) {
    //     const errorResult = error as HttpError;
    //     expect(errorResult).toBeInstanceOf(HttpError);
    //     expect(errorResult.status).toBe(406);
    //     expect(errorResult.statusMessage).toBe(
    //       'Error uploading image to Cloudinary'
    //     );
    //     expect(errorResult.message).toBe('Not Found');
    //     // Expect(errorResult.message).toBe('Upload failed');
    //   }
    // });
  });
});
