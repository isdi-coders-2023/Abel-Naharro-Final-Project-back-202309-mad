import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { VotesMongoRepo } from '../repos/votes/votes.mongo.repo.js';
import { HttpError } from '../types/http.error.js';

const debugServer = createDebug('LOG:CONTROLLER:VOTES');

export class VotesController {
  constructor(private repo: VotesMongoRepo) {
    this.repo = repo;
    debugServer('Starting controller...');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body) throw new HttpError(406, 'Not Acceptable', 'Invalid body');
      req.body.offer = req.params.nameFilter;
      debugServer('Controller vote offer create:', req.body);

      const result = await this.repo.create(req.body);
      res.status(201);
      res.statusMessage = 'Created';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
