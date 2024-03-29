import { Terminal } from '../../entities/terminal.js';
import { Repository } from '../repo.js';
import { TerminalModel } from './terminals.mongo.model.js';
import { HttpError } from '../../types/http.error.js';
import { GroupModel } from '../groups/groups.mongo.model.js';

export class TerminalsMongoRepo implements Repository<Terminal> {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  async getAll(): Promise<Terminal[]> {
    const result = await TerminalModel.find()
      .populate('group', { id: 0 })
      .exec();
    if (result.length === 0)
      throw new HttpError(404, 'Not Found', 'No terminals found');
    return result;
  }

  async getById(id: string): Promise<Terminal> {
    const result = await TerminalModel.findById(id).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Get by id failed');
    return result;
  }

  async create(data: Omit<Terminal, 'id'>): Promise<Terminal> {
    const newTerminal = await TerminalModel.create(data);
    return newTerminal;
  }

  async update(id: string, data: Partial<Terminal>): Promise<Terminal> {
    const newTerminal = await TerminalModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    if (newTerminal === null)
      throw new HttpError(404, 'Not found', 'Wrong id for the update');
    return newTerminal;
  }

  async delete(id: string): Promise<void> {
    const result = (await TerminalModel.findByIdAndDelete(
      id
    ).exec()) as Terminal;
    if (result === null)
      throw new HttpError(404, 'Not found', 'Bad id for the delete');

    await GroupModel.findByIdAndUpdate(result.group, {
      $pull: { terminals: id },
    }).exec();
  }
}
