import createDebug from 'debug';
import { Terminal } from '../../entitites/terminal.js';
import { Repository } from '../repo.js';
import { TerminalModel } from './terminals.mongo.model.js';
import { HttpError } from '../../types/http.error.js';

const debug = createDebug('IPH:TerminalsMongoRepo');

export class TerminalsMongoRepo implements Repository<Terminal> {
  constructor() {
    debug('Instantiated');
  }

  async getAll(): Promise<Terminal[]> {
    const result = await TerminalModel.find().exec();
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
    const result = await TerminalModel.findByIdAndDelete(id).exec();
    if (result === null)
      throw new HttpError(404, 'Not found', 'Bad id for the delete');
  }
}
