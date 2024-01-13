import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repositories/users/users.mongo.repo.js';
import { UsersController } from '../controllers/users.controller.js';

const debug = createDebug('IPH:UserRouter');

debug('Executed');
const repo = new UsersMongoRepo();
const controller = new UsersController(repo);

export const userRouter = createRouter();

userRouter.get('/', controller.getAll.bind(controller));
userRouter.get('/:id', controller.getById.bind(controller));
userRouter.post('/register', controller.create.bind(controller));
userRouter.patch('/login', controller.login.bind(controller));
userRouter.patch('/:id', controller.login.bind(controller));
userRouter.delete('/:id', controller.delete.bind(controller));
