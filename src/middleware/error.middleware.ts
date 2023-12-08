import { NextFunction, Request, Response } from 'express';
import mongoose, { Error } from 'mongoose';
import { HttpError } from '../types/http.error.js';
import createDebug from 'debug';

const debugServer = createDebug('LOG:MIDDLEWARE:ERROR');

debugServer('Starting');
export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debugServer('Middleware Errors');

  if (error instanceof HttpError) {
    res.status(error.status);
    res.statusMessage = (error as HttpError).statusMessage;
  } else if (error instanceof RangeError) {
    res.status(416);
    res.statusMessage = 'Request Range Not Satisfiable';
  } else if (error instanceof Error.ValidationError) {
    res.status(400);
    res.statusMessage = 'Bad Request';
  } else if (error instanceof mongoose.mongo.MongoServerError) {
    res.status(406);
    res.statusMessage = 'Not accepted';
  } else {
    res.status(500);
    res.statusMessage = 'Internal Server Error';
  }

  res.json({});
  debugServer((error as Error).name);
  debugServer((error as Error).message);
};
