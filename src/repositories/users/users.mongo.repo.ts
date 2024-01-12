import createDebug from 'debug';
import { UserModel } from './users.mongo.model.js';
import { HttpError } from '../../types/http.error.js';
import { Auth } from '../../services/auth.js';
import { LoginUser, User } from '../../entitites/user.js';

const debug = createDebug('IPH:UsersMongoRepo');

export class UsersMongoRepo {
  constructor() {
    debug('Instantiated');
  }

  async create(newUser: Omit<User, 'id'>): Promise<User> {
    newUser.password = await Auth.hash(newUser.password);
    const result: User = await UserModel.create(newUser);
    return result;
  }

  async login(loginUser: LoginUser): Promise<User> {
    const result = await UserModel.findOne({ email: loginUser.email }).exec();
    if (!result || !(await Auth.compare(loginUser.password, result.password)))
      throw new HttpError(401, 'Unauthorized');
    return result;
  }

  async getAll(): Promise<User[]> {
    const result = await UserModel.find().exec();
    return result;
  }

  async getById(id: string): Promise<User> {
    const result = await UserModel.findById(id).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }
}
