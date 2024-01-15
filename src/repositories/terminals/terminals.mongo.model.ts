import { Schema, model } from 'mongoose';

import { Terminal } from '../../entities/terminal.js';

const terminalsSchema = new Schema<Terminal>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  battery: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  wifi: {
    type: String,
    required: true,
  },
  isConnected: {
    type: String,
    required: true,
    default: 'Yes',
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
  },
});

terminalsSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const TerminalModel = model<Terminal>(
  'Terminal',
  terminalsSchema,
  'terminals'
);
