import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { ChatsMongoRepo } from '../repositories/chats/chats.mongo.repo.js';
import { ChatsController } from '../controllers/chats.controller.js';

const debug = createDebug('IPH:ChatsRouter');

debug('Executed');
const repo = new ChatsMongoRepo();
const controller = new ChatsController(repo);
const interceptor = new AuthInterceptor();

export const chatsRouter = createRouter();

chatsRouter.get(
  '/',
  interceptor.authorization.bind(interceptor),
  controller.getAll.bind(controller)
);
chatsRouter.get(
  '/:id',
  interceptor.authorization.bind(interceptor),
  controller.getById.bind(controller)
);
chatsRouter.post(
  '/',
  interceptor.authorization.bind(interceptor),
  interceptor.isAdmin.bind(interceptor),
  controller.create.bind(controller)
);
chatsRouter.patch(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.isAdmin.bind(interceptor),
  controller.update.bind(controller)
);
chatsRouter.delete(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.isAdmin.bind(interceptor),
  controller.delete.bind(controller)
);
