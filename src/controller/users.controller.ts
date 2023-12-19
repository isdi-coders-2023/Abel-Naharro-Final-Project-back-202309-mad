import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repos/users/users.mongo.repo.js';
import { HttpError } from '../types/http.error.js';
import { Auth } from '../services/auth.js';
import { LoginResponse } from '../types/login.response.js';

const debugServer = createDebug('LOG:CONTROLLER:USERS');

export class UsersController {
  constructor(private repo: UsersMongoRepo) {
    this.repo = repo;
    debugServer('Starting controller...');
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      debugServer('Controller body getById:', req.params.id);
      if (!req.params.id) throw new HttpError(400, 'Bad Request');
      const result = await this.repo.getById(req.params.id);
      debugServer('Controller result create:', result);
      res.status(200);
      res.statusMessage = 'Accepted';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      debugServer('Controller body login:', req.body);

      const result = req.body.userId
        ? await this.repo.getById(req.body.userId)
        : await this.repo.login(req.body);

      const data: LoginResponse = {
        user: result,
        token: Auth.signJWT({
          id: result.id,
          email: result.email,
        }),
      };

      debugServer('Controller result login:', data);
      res.status(200);
      res.statusMessage = 'Accepted';
      res.json(data);
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
