import createDebug from 'debug';
import { Controller } from './controller.js';
import { Group } from '../entitites/group.js';
import { GroupsMongoRepo } from '../repositories/groups/groups.mongo.repo.js';

const debug = createDebug('IPH:GroupsController');

export class GroupsController extends Controller<Group> {
  constructor(protected repo: GroupsMongoRepo) {
    super(repo);
    debug('Instantiated');
  }
}
