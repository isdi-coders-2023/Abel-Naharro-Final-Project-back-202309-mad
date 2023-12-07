import createDebug from 'debug';
import { LoginUser, User } from '../../entities/user';
import { UserModel } from './users.mongo.model.js';
import { HttpError } from '../../types/http.error.js';
const debugServer = createDebug('LOG:REPO:USERS');

export class UsersMongoRepo {
  constructor() {
    debugServer('Instantiated repo...');
  }

  async login(loginUser: LoginUser): Promise<User> {
    const result = await UserModel.findOne({
      email: loginUser.email,
    }).exec();

    debugServer('Login result:', result);
    if (!result || loginUser.password !== result.password)
      throw new HttpError(401, 'Unauthorized', 'Login not possible');

    return result;
  }

  async create(newUser: Omit<User, 'id'>): Promise<User> {
    const result: User = await UserModel.create(newUser);
    return result;
  }
}
