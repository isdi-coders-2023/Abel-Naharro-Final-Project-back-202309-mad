import { Vote } from '../../entities/vote.js';
import { VoteModel } from './votes.mongo.model.js';
// Import { Vote } from '../../entities/vote.js';
import { VotesMongoRepo } from './votes.mongo.repo.js';

jest.mock('./votes.mongo.model.js');

describe('Given VotesMongoRepo class', () => {
  describe('When we instantiate it without errors', () => {
    let repo: VotesMongoRepo;

    beforeEach(() => {
      VoteModel.create = jest.fn().mockResolvedValue({} as unknown as Vote);
      repo = new VotesMongoRepo();
    });

    test('Then it should execute create', async () => {
      const result = await repo.create({} as Vote);
      expect(VoteModel.create).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });
});
