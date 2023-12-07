import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error.js';
import moongose, { Error } from 'mongoose';
import createDebug from 'debug';

const debug = createDebug('LOG:MIDDLEWARE:ERROR');

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug('Load middleware Errors');

  if (error instanceof HttpError) {
    res.status(error.status);
    res.statusMessage = error.statusMessage;
  } else if (error instanceof Error.ValidationError) {
    res.status(400);
    res.statusMessage = 'Bad Request';
  } else if (error instanceof moongose.mongo.MongoServerError) {
    res.status(406);
    res.statusMessage = 'Not Acceptable';
  } else {
    res.status(500);
    res.statusMessage = 'Internal Server Error';
  }

  res.json({});
  debug((error as HttpError).message);
};
