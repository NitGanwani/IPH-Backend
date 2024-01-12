import createDebug from 'debug';
import { Terminal } from '../entitites/terminal.js';
import { TerminalsMongoRepo } from '../repositories/terminals/terminals.mongo.repo.js';
import { Controller } from './controller.js';

const debug = createDebug('IPH:TerminalsController');

export class TerminalsController extends Controller<Terminal> {
  constructor(protected repo: TerminalsMongoRepo) {
    super(repo);
    debug('Instantiated');
  }
}
