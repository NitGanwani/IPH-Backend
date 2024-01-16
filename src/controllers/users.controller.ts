import { NextFunction, Request, Response } from 'express';

import { UsersMongoRepo } from '../repositories/users/users.mongo.repo.js';
import { Auth } from '../services/auth.js';
import { User } from '../entities/user.js';
import { Controller } from './controller.js';
import { LoginResponse } from '../types/login.response.js';
import { ChatsMongoRepo } from '../repositories/chats/chats.mongo.repo.js';

export class UsersController extends Controller<User> {
  constructor(
    protected repo: UsersMongoRepo,
    // eslint-disable-next-line no-unused-vars
    protected chatsRepo: ChatsMongoRepo
  ) {
    super(repo);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = req.body.userId
        ? await this.repo.getById(req.body.userId)
        : await this.repo.login(req.body);

      const data: LoginResponse = {
        user: result,
        token: Auth.signJWT({
          id: result.id,
          email: result.email,
          role: result.role,
        }),
      };
      res.status(202);
      res.statusMessage = 'Accepted';
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.repo.create(req.body);
      const { chat } = req.body;

      if (chat) {
        await this.chatsRepo.addParticipantToChat(chat, user.id);
      }

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
