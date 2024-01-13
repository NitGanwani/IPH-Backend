import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repositories/users/users.mongo.repo.js';
import { UsersController } from '../controllers/users.controller.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { ChatsMongoRepo } from '../repositories/chats/chats.mongo.repo.js';

const debug = createDebug('IPH:UserRouter');

debug('Executed');
const repo = new UsersMongoRepo();
const chatsRepo = new ChatsMongoRepo();
const controller = new UsersController(repo, chatsRepo);
const interceptor = new AuthInterceptor();

export const usersRouter = createRouter();

usersRouter.get(
  '/',
  interceptor.authorization.bind(interceptor),
  interceptor.isAdmin.bind(interceptor),
  controller.getAll.bind(controller)
);
usersRouter.get(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.isAdmin.bind(interceptor),
  controller.getById.bind(controller)
);
usersRouter.post('/register', controller.register.bind(controller));
usersRouter.patch('/login', controller.login.bind(controller));
