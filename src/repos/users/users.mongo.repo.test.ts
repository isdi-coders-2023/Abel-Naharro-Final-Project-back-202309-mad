import { UsersMongoRepo } from './users.mongo.repo';
import { UserModel } from './users.mongo.model.js';
import { LoginUser, User } from '../../entities/user';

jest.mock('./users.mongo.model.js');

describe('Given UserRepo class', () => {
  let repo: UsersMongoRepo;
  describe('When we instantiate it without errors', () => {
    const exec = jest.fn().mockResolvedValue('login');
    beforeEach(() => {
      const mockQueryMethod = jest.fn().mockReturnValue({
        exec,
      });
      UserModel.findOne = mockQueryMethod;
      UserModel.create = jest.fn().mockResolvedValue('Created');
      repo = new UsersMongoRepo();
    });

    test('Then it should execute login', async () => {
      const result = await repo.login({} as LoginUser);
      expect(UserModel.findOne).toHaveBeenCalled();
      expect(result).toBe('login');
    });

    test('Then it should execute create', async () => {
      const result = await repo.create({} as Omit<User, 'id'>);
      expect(UserModel.create).toHaveBeenCalled();
      expect(result).toBe('Created');
    });
  });
  describe('When we instantiate it with errors', () => {
    const mockError = new Error('Invalid credentials');
    const exec = jest.fn().mockRejectedValue(mockError);
    beforeEach(() => {
      const mockQueryMethod = jest.fn().mockReturnValue({
        exec,
      });
      UserModel.findOne = mockQueryMethod;
      repo = new UsersMongoRepo();
    });
    test.skip('Then it should execute with fail login', async () => {
      const result = await repo.login({} as LoginUser);
      expect(UserModel.findOne).toHaveBeenCalled();
      expect(result).toHaveBeenCalledWith(mockError);
    });
  });
});
