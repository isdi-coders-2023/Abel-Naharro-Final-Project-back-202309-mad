import { NextFunction, Request, Response } from 'express';
import { VotesMongoRepo } from '../repos/votes/votes.mongo.repo.js';
import { VotesController } from './votes.controller.js';
import { Vote } from '../entities/vote.js';
import { HttpError } from '../types/http.error.js';

describe('Given VoteController class', () => {
  let controller: VotesController;
  const mockRepo = {
    create: jest.fn().mockResolvedValue({}),
  } as unknown as VotesMongoRepo;

  const mockRequest = {
    body: {},
    params: {},
    query: { key: 'value' },
  } as unknown as Request;
  const mockResponse = {
    json: jest.fn().mockReturnValue({} as Vote),
    status: jest.fn(),
  } as unknown as Response;
  const mockNext = jest.fn() as NextFunction;

  beforeEach(() => {
    controller = new VotesController(mockRepo);
  });

  describe('When I call the create method', () => {
    test('Then it should return vote', async () => {
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.statusMessage).toBe('Created');
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });
  });

  describe('When I call the create method', () => {
    test('Then it should return error', async () => {
      const mockError = {} as unknown as HttpError;
      mockRequest.body = null;
      const mockRepo = {
        create: await jest.fn().mockRejectedValue(mockError),
      } as unknown as VotesMongoRepo;
      const controller = new VotesController(mockRepo);

      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(
        new HttpError(406, 'Not Acceptable', 'Invalid body')
      );
    });
  });
});
