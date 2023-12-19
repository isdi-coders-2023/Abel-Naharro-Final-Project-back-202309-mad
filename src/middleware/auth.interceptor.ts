import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error.js';
import { Auth } from '../services/auth.js';
import createDebug from 'debug';
import { OffersMongoRepo } from '../repos/offers/offers.mongo.repo.js';

const debugServer = createDebug('LOG:MIDDLEWARE:AUTH INTERCEPTOR');

export class AuthInterceptor {
  constructor() {
    debugServer('Instantiated');
  }

  authorization(req: Request, _res: Response, next: NextFunction) {
    try {
      const tokenHeader = req.get('authorization');
      if (!tokenHeader!.startsWith('Bearer '))
        throw new HttpError(401, 'Unauthorized', 'Login not possible');
      const token = tokenHeader?.split(' ')[1];
      const tokenPayload = Auth.verifyJWT(token!);
      req.body.userId = tokenPayload.id;
      next();
    } catch (error) {
      next(error);
    }
  }

  async authentication(req: Request, _res: Response, next: NextFunction) {
    try {
      const userID = req.body.userId;
      const recipeToAddID = req.params.id;
      const repoOffers = new OffersMongoRepo();
      const OfferItem = await repoOffers.getById(recipeToAddID);

      if (OfferItem.author.id !== userID)
        throw new HttpError(401, 'Unauthorized', 'User not valid');
      next();
    } catch (error) {
      next(error);
    }
  }
}
