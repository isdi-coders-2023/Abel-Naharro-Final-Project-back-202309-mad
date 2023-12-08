import { UsersMongoRepo } from './users.mongo.repo';
import { UserModel } from './users.mongo.model.js';
import { LoginUser, User } from '../../entities/user';
import { Auth } from '../../services/auth';
import { HttpError } from '../../types/http.error';
// Import { HttpError } from '../../types/http.error';

jest.mock('./users.mongo.model.js');

describe('Given UserRepo class', () => {
  let repo: UsersMongoRepo;
  describe('When we instantiate it without errors', () => {
    const exec = jest.fn().mockResolvedValue(true);

    beforeEach(() => {
      const mockQueryMethod = jest.fn().mockReturnValue({
        exec,
      });
      UserModel.findOne = mockQueryMethod;
      UserModel.create = jest.fn().mockResolvedValue('Created');

      Auth.hash = jest.fn().mockResolvedValue('testHash');
      Auth.compare = jest.fn().mockResolvedValue(true);

      repo = new UsersMongoRepo();
    });

    test('Then it should execute login', async () => {
      const result = await repo.login({} as LoginUser);
      expect(UserModel.findOne).toHaveBeenCalled();
      expect(Auth.compare).toHaveBeenCalled();
      expect(result).toEqual(true);
    });

    test('Then it should execute create', async () => {
      const result = await repo.create({} as Omit<User, 'id'>);
      expect(UserModel.create).toHaveBeenCalled();
      expect(result).toBe('Created');
    });
  });
  describe('When we instantiate it with errors', () => {
    const exec = jest.fn().mockResolvedValue(false);
    beforeEach(() => {
      const mockQueryMethod = jest.fn().mockReturnValue({
        exec,
      });
      UserModel.findOne = mockQueryMethod;

      Auth.hash = jest.fn().mockResolvedValue('testHash');
      Auth.compare = jest.fn().mockResolvedValue(false);
      repo = new UsersMongoRepo();
    });
    test('Then it should execute with fail login', async () => {
      const loginUser = {} as unknown as LoginUser;
      expect(repo.login(loginUser)).rejects.toThrow(
        new HttpError(401, 'Unauthorized', 'Login not possible')
      );
    });
  });
});
