import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { NextFunction, Request, Response } from 'express';
import { TokenPayload, Auth } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';

describe('AuthInterceptor', () => {
  describe('authorization method', () => {
    test('should handle valid Bearer token', async () => {
      const mockRequest = {
        get: jest.fn().mockReturnValue('Bearer mockToken'),
        verifyJWT: jest.fn().mockReturnValue({} as TokenPayload),
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
      // Expect(mockNext).toHaveBeenCalled();
    });

    // Test('should reject request for invalid Bearer token', async () => {
    //   const mockRequest = {
    //     get: jest.fn().mockReturnValue('InvalidToken mockToken'),
    //   } as unknown as Request;
    //   const mockError = new HttpError(
    //     401,
    //     'Unauthorized',
    //     'Login not possible'
    //   );
    //   const mockResponse = new Response() as unknown as Response;
    //   const mockNext = jest.fn();

    //   const interceptor = new AuthInterceptor();
    //   await expect(
    //     interceptor.authorization(mockRequest, mockResponse, mockNext)
    //   ).rejects.toThrow(mockError);

    //   expect(mockError).toBeInstanceOf(HttpError);
    //   expect(mockError.status).toBe(401);
    // });
  });
});