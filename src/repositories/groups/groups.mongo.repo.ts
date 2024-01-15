import createDebug from 'debug';
import { Repository } from '../repo.js';
import { HttpError } from '../../types/http.error.js';
import { Group } from '../../entities/group.js';
import { GroupModel } from './groups.mongo.model.js';

const debug = createDebug('IPH:GroupsMongoRepo');

export class GroupsMongoRepo implements Repository<Group> {
  constructor() {
    debug('Instantiated');
  }

  async getAll(): Promise<Group[]> {
    const result = await GroupModel.find()
      .populate('terminals', { group: 0, id: 0 })
      .exec();
    if (result.length === 0)
      throw new HttpError(404, 'Not Found', 'No groups found');
    return result;
  }

  async getById(id: string): Promise<Group> {
    const result = await GroupModel.findById(id)
      .populate('terminals', { id: 0 })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Get by id failed');
    return result;
  }

  async create(data: Omit<Group, 'id'>): Promise<Group> {
    const newGroup = await GroupModel.create(data);
    return newGroup;
  }

  async update(id: string, data: Partial<Group>): Promise<Group> {
    const newGroup = await GroupModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    if (newGroup === null)
      throw new HttpError(404, 'Not found', 'Wrong id for the update');
    return newGroup;
  }

  async delete(id: string): Promise<void> {
    const result = await GroupModel.findByIdAndDelete(id).exec();
    if (result === null)
      throw new HttpError(404, 'Not found', 'Bad id for the delete');
  }
}
