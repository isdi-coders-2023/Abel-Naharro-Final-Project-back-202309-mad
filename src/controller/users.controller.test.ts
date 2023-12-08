import { Request, Response, NextFunction } from 'express';
import { UsersController } from './users.controller.js';
import { UsersMongoRepo } from '../repos/users/users.mongo.repo.js';
import { User } from '../entities/user.js';
import { HttpError } from '../types/http.error.js';

describe('Given UserController class', () => {
  let controller: UsersController;
  const mockRepo = {
    login: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockResolvedValue({}),
  } as unknown as UsersMongoRepo;

  const mockRequest = {
    body: {},
    params: {},
    query: { key: 'value' },
  } as unknown as Request;
  const mockResponse = {
    json: jest.fn().mockReturnValue({} as User),
    status: jest.fn(),
  } as unknown as Response;
  const mockNext = jest.fn() as NextFunction;

  beforeEach(() => {
    controller = new UsersController(mockRepo);
  });

  describe('When we instantiate it without errors', () => {
    test('Then login should...', async () => {
      await controller.login(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.statusMessage).toBe('Accepted');
    });
    test('Then create should...', async () => {
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.statusMessage).toBe('Created');
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });
  });

  describe('When we instantiate it with errors', () => {
    let mockError = {} as unknown as HttpError;

    // Const mockError = new Error('Bad Request');
    const mockRepoError = {
      login: jest.fn().mockRejectedValue({}),
      create: jest.fn().mockRejectedValue({}),
    } as unknown as UsersMongoRepo;
    const controller = new UsersController(mockRepoError);
    const req: Request = {} as Request;
    const res: Response = {} as Response;
    const next = jest.fn() as NextFunction;

    test('Then login should error...', async () => {
      mockError = new HttpError(400, 'Bad Request');
      await controller.login(req, res, next);
      expect(next).toHaveBeenCalledWith(mockError);
    });
    test('Then the create without request body param should', async () => {
      await controller.create(req, res, next);
      expect(next).toHaveBeenCalledWith(mockError);
    });

    test('Then create should error...', async () => {
      const mockDataCreate = {} as unknown as User;
      mockRequest.body = {
        mockDataCreate,
      } as unknown as Request;
      const mockRepo = {
        create: await jest.fn().mockRejectedValue(mockError),
      } as unknown as UsersMongoRepo;
      const controller = new UsersController(mockRepo);

      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
    test('Then create should error...', async () => {
      const mockDataCreate = {} as unknown as User;
      mockRequest.body = {
        mockDataCreate,
      } as unknown as Request;
      const mockRepo = {
        create: await jest.fn().mockRejectedValue(mockError),
      } as unknown as UsersMongoRepo;
      const controller = new UsersController(mockRepo);

      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
