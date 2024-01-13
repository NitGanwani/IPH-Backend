import { Controller } from './controller.js';
import { Chat } from '../entitites/chat.js';
import { ChatsMongoRepo } from '../repositories/chats/chats.mongo.repo.js';

export class ChatsController extends Controller<Chat> {
  constructor(protected repo: ChatsMongoRepo) {
    super(repo);
  }
}
