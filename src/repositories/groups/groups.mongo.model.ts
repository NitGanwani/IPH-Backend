import { Schema, model } from 'mongoose';

import { Group } from '../../entitites/group.js';

const groupsSchema = new Schema<Group>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  terminals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Terminal',
    },
  ],
});

groupsSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const GroupModel = model<Group>('Group', groupsSchema, 'groups');
