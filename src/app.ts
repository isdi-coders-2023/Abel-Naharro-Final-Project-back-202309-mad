import cors from 'cors';
import createDebug from 'debug';
import express from 'express';
import morgan from 'morgan';
import { usersRouter } from './router/users.router.js';
import { errorMiddleware } from './middleware/error.middleware.js';

const debugServer = createDebug('LOG:APP');

export const app = express();

debugServer('Starting server...');
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/user', usersRouter);

app.use(errorMiddleware);
