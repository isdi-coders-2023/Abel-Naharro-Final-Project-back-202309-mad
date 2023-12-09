import { Router as createRouter } from 'express';
import createDebug from 'debug';

import { OffersMongoRepo } from '../repos/offers/offers.mongo.repo.js';
import { OffersController } from '../controller/offers.controller.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { VotesMongoRepo } from '../repos/votes/votes.mongo.repo.js';
import { VotesController } from '../controller/votes.controller.js';

const debugServer = createDebug('LOG:ROUTER:OFFERS');

export const offersRouter = createRouter();

const offerRepo = new OffersMongoRepo();
const offerController = new OffersController(offerRepo);
const voteRepo = new VotesMongoRepo();
const voteController = new VotesController(voteRepo);
const interceptor = new AuthInterceptor();

debugServer('Starting router...');

offersRouter.get('/', offerController.getAll.bind(offerController));

offersRouter.get('/:id', offerController.getById.bind(offerController));

offersRouter.get(
  '/category/:nameFilter',
  offerController.getByCategory.bind(offerController)
);

offersRouter.get(
  '/user/:idUser',
  offerController.getByUser.bind(offerController)
);

offersRouter.post(
  '/',
  interceptor.authorization.bind(interceptor),
  offerController.create.bind(offerController)
);

offersRouter.patch(
  '/:id',
  interceptor.authorization.bind(interceptor),
  offerController.update.bind(offerController)
);

offersRouter.delete(
  '/:id',
  interceptor.authorization.bind(interceptor),
  offerController.delete.bind(offerController)
);

offersRouter.post(
  '/vote/:id',
  interceptor.authorization.bind(interceptor),
  offerController.create.bind(voteController)
);
