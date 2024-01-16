import { Router as createRouter } from 'express';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { GroupsMongoRepo } from '../repositories/groups/groups.mongo.repo.js';
import { GroupsController } from '../controllers/groups.controller.js';

const repo = new GroupsMongoRepo();
const controller = new GroupsController(repo);
const interceptor = new AuthInterceptor();

export const groupsRouter = createRouter();

groupsRouter.get('/', controller.getAll.bind(controller));
groupsRouter.get(
  '/:id',
  interceptor.authorization.bind(interceptor),
  controller.getById.bind(controller)
);
groupsRouter.post(
  '/',
  interceptor.authorization.bind(interceptor),
  interceptor.isAdmin.bind(interceptor),
  controller.create.bind(controller)
);
groupsRouter.patch(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.isAdmin.bind(interceptor),
  controller.update.bind(controller)
);
groupsRouter.delete(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.isAdmin.bind(interceptor),
  controller.delete.bind(controller)
);
