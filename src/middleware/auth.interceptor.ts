import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error.js';
import { Auth } from '../services/auth.js';
import createDebug from 'debug';
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
      req.body.id = tokenPayload.id;
      next();
    } catch (error) {
      next(error);
    }
  }
}
