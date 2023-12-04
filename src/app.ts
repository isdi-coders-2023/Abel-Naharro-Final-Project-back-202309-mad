import cors from 'cors';
import createDebug from 'debug';
import express from 'express';
import morgan from 'morgan';

const debugServer = createDebug('LOG:APP');
export const app = express();

debugServer('Starting server...');
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// App.use('/users', usersRouter);
// app.use('/offer', offerRouter);
