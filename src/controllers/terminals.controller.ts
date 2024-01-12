import { Terminal } from '../entitites/terminal';
import { TerminalsMongoRepo } from '../repositories/terminals/terminals.mongo.repo';
import { Controller } from './controller';

export class TerminalsController extends Controller<Terminal> {
  constructor(protected repo: TerminalsMongoRepo) {
    super(repo);
  }
}
