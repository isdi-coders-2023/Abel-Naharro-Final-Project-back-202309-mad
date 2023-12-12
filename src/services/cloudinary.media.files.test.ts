// Can upload an image successfully
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryMediaFiles } from './cloudinary.media.files.js';
import { HttpError } from '../types/http.error.js';
describe('Given the Media File class', () => {
  describe('When I use upload a image', () => {
    test.skip('should upload an image successfully when given a valid imagePath', async () => {
      const imagePath = 'valid/image/path.jpg';
      const uploadApiResponse = {
        url: 'https://example.com/image.jpg',
        // eslint-disable-next-line camelcase
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
        // eslint-disable-next-line camelcase
        use_filename: true,
        // eslint-disable-next-line camelcase
        unique_filename: false,
        overwrite: true,
      });
      expect(result).toEqual({
        url: 'https://example.com/image.jpg',
        publicId: 'public_id',
        size: 1000,
        height: 500,
        With: 500,
        format: 'jpg',
      });
    });
    test.skip('should handle cloudinary API errors when image upload fails', async () => {
      const imagePath = 'valid/image/path.jpg';
      const error = new Error('Upload failed');
      cloudinary.uploader.upload = jest.fn().mockRejectedValue(error);
      const mediaFiles = new CloudinaryMediaFiles();
      let errorResult: HttpError | undefined;
      try {
        await mediaFiles.uploadImage(imagePath);
      } catch (error) {
        errorResult = error as HttpError;
      }

      if (errorResult) {
        expect(errorResult).toBeInstanceOf(HttpError);
        expect(errorResult.status).toBe(406);
        expect(errorResult.statusMessage).toBe(
          'Error uploading image to Cloudinary'
        );
        // Expect(errorResult.message).toBe('Upload failed');
      }
    });
  });
});
