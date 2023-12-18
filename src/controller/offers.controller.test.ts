import { NextFunction, Request, Response } from 'express';
import { OffersMongoRepo } from '../repos/offers/offers.mongo.repo.js';
import { HttpError } from '../types/http.error.js';
import { OffersController } from './offers.controller.js';
import { Offer } from '../entities/offer.js';

jest.mock('../services/cloudinary.media.files.js');
// Jest.mock('../repos/offers/offers.mongo.repo.js');

describe('Given OfferController class', () => {
  describe('When I call the method', () => {
    let controller: OffersController;
    const mockRepo = {
      getAll: jest.fn().mockResolvedValue({}),
      getByCategory: jest.fn().mockResolvedValue({}),
      getByUser: jest.fn().mockResolvedValue({}),
      getById: jest.fn().mockResolvedValue({}),
      create: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
      delete: jest.fn().mockResolvedValue({}),
    } as unknown as OffersMongoRepo;

    const mockRequest = {
      body: {
        author: { id: '1' },
        image: {
          publicId: 'mockPublicId',
          format: ' webp',
          url: 'mockUrl',
          size: '0',
          cloudinaryURL: 'mockUrl',
        },
      },
      file: { path: 'mockPath' },
      params: { id: '1' },
      query: { key: 'value' },
    } as unknown as Request;

    const mockResponse = {
      json: jest.fn().mockReturnValue({} as Offer),
      status: jest.fn(),
    } as unknown as Response;

    const mockNext = jest.fn() as NextFunction;

    beforeEach(() => {
      controller = new OffersController(mockRepo);
    });

    test('getAll', async () => {
      await controller.getAll(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.statusMessage).toBe('Accepted');
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });

    test('getByCategory', async () => {
      await controller.getByCategory(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.statusMessage).toBe('Accepted');
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });

    test('getByUser', async () => {
      await controller.getByUser(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.statusMessage).toBe('Accepted');
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });

    test('getById', async () => {
      await controller.getById(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.statusMessage).toBe('Accepted');
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });

    test('create', async () => {
      const mockCloudinaryService = {
        uploadImage: jest.fn().mockResolvedValue(''),
      };
      controller.cloudinaryService = mockCloudinaryService;
      await controller.create(mockRequest, mockResponse, mockNext);

      expect(mockCloudinaryService.uploadImage).toHaveBeenCalled();
    });

    test('update', async () => {
      await controller.update(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.statusMessage).toBe('Updated');
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });

    test('delete', async () => {
      await controller.delete(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.statusMessage).toBe('Deleted');
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });
  });
  describe('When I call the method, return error', () => {
    let controller: OffersController;
    const mockRepo = {
      getAll: jest.fn().mockRejectedValue({}),
      getByCategory: jest.fn().mockRejectedValue({}),
      getByUser: jest.fn().mockRejectedValue({}),
      getById: jest.fn().mockRejectedValue({}),
      create: jest.fn().mockRejectedValue({}),
      update: jest.fn().mockRejectedValue({}),
      delete: jest.fn().mockRejectedValue({}),
    } as unknown as OffersMongoRepo;

    const mockRequest = {
      body: {},
      params: {},
      query: { key: 'value' },
    } as unknown as Request;
    const mockResponse = {
      json: jest.fn().mockReturnValue({} as Offer),
      status: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as NextFunction;

    beforeEach(() => {
      controller = new OffersController(mockRepo);
    });

    test('getAll', async () => {
      mockRequest.body = null;
      await controller.getAll(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new HttpError(400, 'Bad Request'));
    });

    test('getByCategory', async () => {
      mockRequest.body = null;
      await controller.getByCategory(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new HttpError(400, 'Bad Request'));
    });

    test('getByUser', async () => {
      mockRequest.body = null;
      await controller.getByUser(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new HttpError(400, 'Bad Request'));
    });

    test('getById', async () => {
      mockRequest.body = null;
      await controller.getById(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new HttpError(400, 'Bad Request'));
    });

    test('create without file', async () => {
      mockRequest.file = undefined;
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(
        new HttpError(400, 'Image is required')
      );
    });
    test('create without body', async () => {
      mockRequest.body = null;
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new HttpError(406, 'Invalid body'));
    });

    test('update', async () => {
      mockRequest.body = null;
      await controller.update(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new HttpError(406, 'Invalid body'));
    });

    test('delete', async () => {
      mockRequest.body = null;
      await controller.delete(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new HttpError(400, 'Bad Request'));
    });
  });
});
