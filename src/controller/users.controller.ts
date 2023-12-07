import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repos/users/users.mongo.repo.js';
import { HttpError } from '../types/http.error.js';

const debugServer = createDebug('LOG:CONTROLLER:USERS');

export class UsersController {
  constructor(private repo: UsersMongoRepo) {
    this.repo = repo;
    debugServer('Starting controller...');
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      debugServer('Controller body login:', req.body);
      // If (!req.body) throw new Error('Invalid body');
      if (!req.body) throw new HttpError(400, 'Bad Request');
      const result = await this.repo.login(req.body);
      const data = {
        user: result,
      };
      debugServer('Controller result login:', data);
      res.status(200);
      res.statusMessage = 'Accepted';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      debugServer('Controller body create:', req.body);
      if (!req.body) throw new HttpError(400, 'Bad Request');
      const result = await this.repo.create(req.body);
      debugServer('Controller result create:', result);
      res.status(201);
      res.statusMessage = 'Created';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
