import createDebug from 'debug';
import { Terminal } from '../entitites/terminal.js';
import { TerminalsMongoRepo } from '../repositories/terminals/terminals.mongo.repo.js';
import { Controller } from './controller.js';
import { GroupsMongoRepo } from '../repositories/groups/groups.mongo.repo.js';
import { Request, Response, NextFunction } from 'express';

const debug = createDebug('IPH:TerminalsController');

export class TerminalsController extends Controller<Terminal> {
  constructor(
    protected repo: TerminalsMongoRepo,
    // eslint-disable-next-line no-unused-vars
    protected groupsRepo: GroupsMongoRepo
  ) {
    super(repo);

    debug('Instantiated');
  }

  async createTerminal(req: Request, res: Response, next: NextFunction) {
    try {
      const { groupId } = req.body;
      const group = await this.groupsRepo.getById(groupId);

      const newTerminal = await this.repo.create({
        ...req.body,
        group,
      });

      group.terminals.push(newTerminal);
      await this.groupsRepo.update(groupId, { terminals: group.terminals });

      res.status(201).json(newTerminal);
    } catch (error) {
      next(error);
    }
  }
}
