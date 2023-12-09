import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { VotesMongoRepo } from '../repos/votes/votes.mongo.repo.js';
import { HttpError } from '../types/http.error.js';
// Import { Auth } from '../services/auth.js';

const debugServer = createDebug('LOG:CONTROLLER:VOTES');

export class VotesController {
  constructor(private repo: VotesMongoRepo) {
    this.repo = repo;
    debugServer('Starting controller...');
  }

  // Async getAll(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     debugServer('Controller offer getAll:', req.body);
  //     if (!req.body) throw new HttpError(400, 'Bad Request');
  //     const result = await this.repo.getAll();
  //     debugServer('Controller result login:', result);
  //     res.status(200);
  //     res.statusMessage = 'Accepted';
  //     res.json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async getByCategory(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     debugServer('Controller offer getByCategory:', req.params.nameFilter);
  //     if (!req.body) throw new HttpError(400, 'Bad Request');
  //     const result = await this.repo.getByCategory(req.params.nameFilter);
  //     debugServer('Controller result create:', result);
  //     res.status(200);
  //     res.statusMessage = 'Accepted';
  //     res.json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async getByUser(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     debugServer('Controller offer getByUser:', req.params.idUser);
  //     if (!req.body) throw new HttpError(400, 'Bad Request');
  //     const result = await this.repo.getByUser(req.params.idUser);
  //     debugServer('Controller result create:', result);
  //     res.status(200);
  //     res.statusMessage = 'Accepted';
  //     res.json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async getById(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     debugServer('Controller offer getById:', req.params.id);
  //     if (!req.params.id) throw new HttpError(400, 'Bad Request');
  //     const result = await this.repo.getById(req.params.id);
  //     debugServer('Controller result create:', result);
  //     res.status(200);
  //     res.statusMessage = 'Accepted';
  //     res.json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // Async update(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     if (!req.body) throw new HttpError(406, 'Not Acceptable', 'Invalid body');
  //     const result = await this.repo.update(req.params.id, req.body);
  //     res.status(200);
  //     res.statusMessage = 'Updated';
  //     res.json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async delete(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     debugServer('Controller offer delete:', req.params.id);
  //     if (!req.params.id) throw new HttpError(400, 'Bad Request');
  //     const result = await this.repo.delete(req.params.id);
  //     debugServer('Controller result create:', result);
  //     res.status(200);
  //     res.statusMessage = 'Deleted';
  //     res.json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body) throw new HttpError(406, 'Not Acceptable', 'Invalid body');
      req.body.offer = req.params.nameFilter;
      debugServer('Controller vote offer create:', req.body);
      // VALIDAR SI EL USUARIO YA VOTO EN LA OFERTA
      const result = await this.repo.create(req.body);
      res.status(201);
      res.statusMessage = 'Created';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
