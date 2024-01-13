import { Schema, model } from 'mongoose';
import { Chat } from '../../entitites/chat';

const chatsSchema = new Schema<Chat>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  isActive: {
    type: Boolean,
    required: true,
    default: false,
  },
});

chatsSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const ChatModel = model<Chat>('Chat', chatsSchema, 'chats');
