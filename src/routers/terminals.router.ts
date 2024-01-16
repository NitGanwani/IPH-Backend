import { Router as createRouter } from 'express';
import { TerminalsMongoRepo } from '../repositories/terminals/terminals.mongo.repo.js';
import { TerminalsController } from '../controllers/terminals.controller.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { GroupsMongoRepo } from '../repositories/groups/groups.mongo.repo.js';

const repo = new TerminalsMongoRepo();
const groupsRepo = new GroupsMongoRepo();
const controller = new TerminalsController(repo, groupsRepo);
const interceptor = new AuthInterceptor();

export const terminalRouter = createRouter();

terminalRouter.get('/', controller.getAll.bind(controller));
terminalRouter.get(
  '/:id',
  interceptor.authorization.bind(interceptor),
  controller.getById.bind(controller)
);
terminalRouter.post(
  '/',
  interceptor.authorization.bind(interceptor),
  interceptor.isAdmin.bind(interceptor),
  controller.createTerminal.bind(controller)
);
terminalRouter.patch(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.isAdmin.bind(interceptor),
  controller.update.bind(controller)
);
terminalRouter.delete(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.isAdmin.bind(interceptor),
  controller.delete.bind(controller)
);
