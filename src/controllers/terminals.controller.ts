import { Terminal } from '../entities/terminal.js';
import { TerminalsMongoRepo } from '../repositories/terminals/terminals.mongo.repo.js';
import { Controller } from './controller.js';
import { GroupsMongoRepo } from '../repositories/groups/groups.mongo.repo.js';
import { Request, Response, NextFunction } from 'express';

export class TerminalsController extends Controller<Terminal> {
  constructor(
    protected repo: TerminalsMongoRepo,
    // eslint-disable-next-line no-unused-vars
    protected groupsRepo: GroupsMongoRepo
  ) {
    super(repo);
  }

  async createTerminal(req: Request, res: Response, next: NextFunction) {
    try {
      const { group } = req.body;

      const existingGroup = await this.groupsRepo.getById(group);

      const newTerminal = await this.repo.create({
        ...req.body,
        group: existingGroup.id,
      });

      existingGroup.terminals.push(newTerminal);

      await this.groupsRepo.update(group, {
        terminals: existingGroup.terminals,
      });

      res.status(201).json(newTerminal);
    } catch (error) {
      next(error);
    }
  }
}
