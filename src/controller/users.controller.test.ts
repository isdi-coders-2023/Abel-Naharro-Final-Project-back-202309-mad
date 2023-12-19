import { Request, Response, NextFunction } from 'express';
import { UsersController } from './users.controller.js';
import { UsersMongoRepo } from '../repos/users/users.mongo.repo.js';
import { User } from '../entities/user.js';
import { HttpError } from '../types/http.error.js';

jest.mock('../services/auth.js');

describe('Given UserController class', () => {
  let controller: UsersController;
  const mockRepo = {
    getById: jest.fn().mockResolvedValue({}),
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
    test('Then getById should...', async () => {
      mockRequest.params.id = '1';
      await controller.getById(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.statusMessage).toBe('Accepted');
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });

    test('Then login should...', async () => {
      await controller.login(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.statusMessage).toBe('Accepted');
    });
    test('Then login with userId should...', async () => {
      mockRequest.body.userId = '1';
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

    const mockRepoError = {
      getById: jest.fn().mockRejectedValue({}),
      login: jest.fn().mockRejectedValue({}),
      create: jest.fn().mockRejectedValue({}),
    } as unknown as UsersMongoRepo;
    const controller = new UsersController(mockRepoError);
    const req: Request = {} as Request;
    const res: Response = {} as Response;
    const next = jest.fn() as NextFunction;

    test('Then getById should error...', async () => {
      mockError = new HttpError(400, 'Bad Request');
      req.params = { id: '' };
      await controller.getById(req, res, next);
      expect(next).toHaveBeenCalledWith(mockError);
    });

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
