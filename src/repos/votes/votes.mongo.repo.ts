import createDebug from 'debug';
// Import { HttpError } from '../../types/http.error.js';
// Import { Offer } from '../../entities/offer';
// import { User } from '../../entities/user.js';
import { VoteModel } from './votes.mongo.model.js';
import { Vote } from '../../entities/vote.js';
const debugServer = createDebug('LOG:REPO:USERS');

export class VotesMongoRepo {
  constructor() {
    debugServer('Instantiated repo...');
  }

  async create(vote: Omit<Vote, 'id'>): Promise<Vote> {
    // Const offerId = offerId;
    // vote.offer = { _id: offerId };
    const result: Vote = await VoteModel.create(vote);
    return result;
  }
}
