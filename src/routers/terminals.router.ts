import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { TerminalsMongoRepo } from '../repositories/terminals/terminals.mongo.repo.js';
import { TerminalsController } from '../controllers/terminals.controller.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('IPH:TerminalRouter');

debug('Executed');
const repo = new TerminalsMongoRepo();
const controller = new TerminalsController(repo);
const interceptor = new AuthInterceptor();

export const terminalRouter = createRouter();

terminalRouter.get(
  '/',
  interceptor.authorization.bind(interceptor),
  controller.getAll.bind(controller)
);
terminalRouter.get(
  '/:id',
  interceptor.authorization.bind(interceptor),
  controller.getById.bind(controller)
);
terminalRouter.post(
  '/',
  interceptor.authorization.bind(interceptor),
  interceptor.isAdmin.bind(interceptor),
  controller.create.bind(controller)
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
