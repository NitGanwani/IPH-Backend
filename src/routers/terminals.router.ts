import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { TerminalsMongoRepo } from '../repositories/terminals/terminals.mongo.repo.js';
import { TerminalsController } from '../controllers/terminals.controller.js';

const debug = createDebug('IPH:TerminalRouter');

debug('Executed');
const repo = new TerminalsMongoRepo();
const controller = new TerminalsController(repo);

export const terminalRouter = createRouter();

terminalRouter.get('/', controller.getAll.bind(controller));
terminalRouter.get('/:id', controller.getById.bind(controller));
terminalRouter.post('/', controller.create.bind(controller));
terminalRouter.patch('/:id', controller.update.bind(controller));
terminalRouter.delete('/:id', controller.delete.bind(controller));
