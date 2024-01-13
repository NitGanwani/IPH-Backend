import { Repository } from '../repo.js';
import { HttpError } from '../../types/http.error.js';
import { Chat } from '../../entitites/chat.js';
import { ChatModel } from './chats.mongo.model.js';

export class ChatsMongoRepo implements Repository<Chat> {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  async getAll(): Promise<Chat[]> {
    const result = await ChatModel.find()
      .populate('participants', { id: 0 })
      .exec();
    if (result.length === 0)
      throw new HttpError(404, 'Not Found', 'No chats found');
    return result;
  }

  async getById(id: string): Promise<Chat> {
    const result = await ChatModel.findById(id)
      .populate('participants', { id: 0 })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Get by id failed');
    return result;
  }

  async create(data: Omit<Chat, 'id'>): Promise<Chat> {
    const newGroup = await ChatModel.create(data);
    return newGroup;
  }

  async update(id: string, data: Partial<Chat>): Promise<Chat> {
    const newGroup = await ChatModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    if (newGroup === null)
      throw new HttpError(404, 'Not found', 'Wrong id for the update');
    return newGroup;
  }

  async delete(id: string): Promise<void> {
    const result = await ChatModel.findByIdAndDelete(id).exec();
    if (result === null)
      throw new HttpError(404, 'Not found', 'Bad id for the delete');
  }

  async addParticipantToChat(chatId: string, userId: string): Promise<void> {
    const updatedChat = await ChatModel.findByIdAndUpdate(
      chatId,
      { $push: { participants: userId } },
      { new: true }
    ).exec();

    if (!updatedChat) {
      throw new HttpError(
        404,
        'Not found',
        'Chat not found for participant addition'
      );
    }
  }
}
