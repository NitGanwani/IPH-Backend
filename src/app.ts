import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createDebug from 'debug';
import { usersRouter } from './routers/users.router.js';
import { errorMiddleware } from './middleware/error.js';
import { terminalRouter } from './routers/terminals.router.js';

const debug = createDebug('IPH:app');

export const app = express();
debug('Starting');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/terminals', terminalRouter);

app.use(errorMiddleware);
