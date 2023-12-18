import createDebug from 'debug';
import { VoteModel } from './votes.mongo.model.js';
import { Vote } from '../../entities/vote.js';
const debugServer = createDebug('LOG:REPO:USERS');

export class VotesMongoRepo {
  constructor() {
    debugServer('Instantiated repo...');
  }

  async create(vote: Omit<Vote, 'id'>): Promise<Vote> {
    const result: Vote = await VoteModel.create(vote);
    return result;
  }
}
