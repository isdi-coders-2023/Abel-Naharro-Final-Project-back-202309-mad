import createDebug from 'debug';
import { LoginUser, User } from '../../entities/user';
import { UserModel } from './users.mongo.model.js';
// Import { UserModel } from './users.mongo.model.js';
const debugServer = createDebug('LOG:REPO:USERS');

export class UsersMongoRepo {
  constructor() {
    debugServer('Instantiated repo...');
  }

  async login(loginUser: LoginUser): Promise<User> {
    const result = await UserModel.findOne({
      email: loginUser.email,
    }).exec();

    if (!result || loginUser.password !== result.password)
      throw new Error('Invalid credentials');
    debugServer('Login result:', result);
    return result;
  }

  async create(newUser: Omit<User, 'id'>): Promise<User> {
    const result: User = await UserModel.create(newUser);
    return result;
  }
}
