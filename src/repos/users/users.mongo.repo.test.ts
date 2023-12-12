import { UsersMongoRepo } from './users.mongo.repo';
import { UserModel } from './users.mongo.model.js';
import { LoginUser, User } from '../../entities/user';
import { Auth } from '../../services/auth';
import { HttpError } from '../../types/http.error';

jest.mock('./users.mongo.model.js');
jest.mock('../../services/auth');

describe('Given UserRepo class', () => {
  let repo: UsersMongoRepo;
  describe('When we instantiate it without errors', () => {
    const exec = jest.fn().mockResolvedValue(true);

    beforeEach(() => {
      const mockQueryMethod = jest.fn().mockReturnValue({
        exec,
      });
      const mockQueryMethodFindById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({} as User),
      });
      UserModel.findOne = mockQueryMethod;
      UserModel.create = jest.fn().mockResolvedValue('Created');
      UserModel.findById = mockQueryMethodFindById;

      Auth.hash = jest.fn().mockResolvedValue('testHash');
      Auth.compare = jest.fn().mockResolvedValue(true);

      repo = new UsersMongoRepo();
    });

    test('Then it should execute getById', async () => {
      const result = await repo.getById('testId');
      expect(UserModel.findById).toHaveBeenCalled();
      expect(result).toEqual({});
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
    beforeEach(() => {
      const mockQueryMethod = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(false),
      });
      const mockQueryMethodFindById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(false),
      });
      UserModel.findOne = mockQueryMethod;
      UserModel.findById = mockQueryMethodFindById;

      Auth.hash = jest.fn().mockResolvedValue('testHash');
      Auth.compare = jest.fn().mockResolvedValue(false);
      repo = new UsersMongoRepo();
    });

    test.skip('Then it should execute with fail getById', async () => {
      const result = await repo.getById('testId');
      // Expect(result).toBe(false);
      expect(result).rejects.toThrow(new HttpError(404, 'Not Found'));
    });
    test('Then it should execute with fail login', async () => {
      const loginUser = {} as unknown as LoginUser;
      expect(repo.login(loginUser)).rejects.toThrow(
        new HttpError(401, 'Unauthorized', 'Login not possible')
      );
    });
  });
});
