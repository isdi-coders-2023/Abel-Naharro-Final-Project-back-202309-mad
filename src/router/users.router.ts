import { Router as createRouter } from 'express';
import createDebug from 'debug';

import { UsersMongoRepo } from '../repos/users/users.mongo.repo.js';
import { UsersController } from '../controller/users.controller.js';

const debugServer = createDebug('LOG:ROUTER:USERS');

export const usersRouter = createRouter();

const userRepo = new UsersMongoRepo();
const userController = new UsersController(userRepo);

debugServer('Starting router...');

usersRouter.post('/register', userController.create.bind(userController));
usersRouter.post('/login', userController.login.bind(userController));
