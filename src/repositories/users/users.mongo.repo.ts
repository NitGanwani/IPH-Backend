import createDebug from 'debug';
import { UserModel } from './users.mongo.model.js';
import { HttpError } from '../../types/http.error.js';
import { Auth } from '../../services/auth.js';
import { LoginUser, User } from '../../entities/user.js';
import { Repository } from '../repo.js';

const debug = createDebug('IPH:UsersMongoRepo');

export class UsersMongoRepo implements Repository<User> {
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
    if (result.length === 0)
      throw new HttpError(404, 'Not Found', 'No users found');
    return result;
  }

  async getById(id: string): Promise<User> {
    const result = await UserModel.findById(id).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Get by id failed');
    return result;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const newUser = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    if (newUser === null)
      throw new HttpError(404, 'Not found', 'Wrong id for the update');
    return newUser;
  }

  async delete(id: string): Promise<void> {
    const result = await UserModel.findByIdAndDelete(id).exec();
    if (result === null)
      throw new HttpError(404, 'Not found', 'Bad id for the delete');
  }
}
