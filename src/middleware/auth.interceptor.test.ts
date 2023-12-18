import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { NextFunction, Request, Response } from 'express';
import { TokenPayload, Auth } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';
import { OffersMongoRepo } from '../repos/offers/offers.mongo.repo.js';
import { Offer } from '../entities/offer.js';

jest.mock('../repos/offers/offers.mongo.repo.js');

describe('AuthInterceptor', () => {
  describe('authorization method', () => {
    test('should handle valid Bearer token', async () => {
      const mockRequest = {
        get: jest.fn().mockReturnValue('Bearer mockToken'),
        body: { id: '1' },
      } as unknown as Request;
      Auth.verifyJWT = jest.fn().mockResolvedValue({} as TokenPayload);
      const mockResponse = new Response() as unknown as Response;
      const mockNext = jest.fn() as NextFunction;

      const interceptor = new AuthInterceptor();
      await interceptor.authorization(mockRequest, mockResponse, mockNext);

      expect(Auth.verifyJWT).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });

    test('should handle no valid Bearer token', async () => {
      const mockRequest = {
        get: jest.fn().mockReturnValue('no valid mockToken'),
        verifyJWT: jest.fn().mockReturnValue({} as TokenPayload),
      } as unknown as Request;
      Auth.verifyJWT = jest.fn().mockResolvedValue({} as TokenPayload);
      const mockResponse = new Response() as unknown as Response;
      const mockNext = jest.fn() as NextFunction;

      const interceptor = new AuthInterceptor();
      await interceptor.authorization(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(
        new HttpError(401, 'Unauthorized', 'Login not possible')
      );
    });
  });

  describe('authentication method', () => {
    let interceptor: AuthInterceptor;

    const mockRequest = {
      params: { id: '1' },
      body: { userId: '1' },
    } as unknown as Request;

    const mockResponse = {
      json: jest.fn().mockReturnValue({} as Offer),
      status: jest.fn(),
    } as unknown as Response;

    const mockNext = jest.fn() as NextFunction;

    beforeEach(() => {
      interceptor = new AuthInterceptor();
    });

    test('should handle valid authentication', async () => {
      await interceptor.authentication(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    // Test.skip('should handle invalid authentication', async () => {
    //   const mockRepo = {
    //     getById: jest.fn().mockRejectedValue({ author: { id: '2' } }),
    //   } as unknown as OffersMongoRepo;

    //   await interceptor.authentication(mockRequest, mockResponse, mockNext);
    //   expect(mockNext).toHaveBeenCalledWith(expect.any(HttpError));
    //   expect(mockRepo.getById).toHaveBeenCalled();
    //   expect(mockNext).rejects.toThrow(
    //     new HttpError(401, 'Unauthorized', 'User not valid')
    //   );
    // });
  });
});
