import { Controller } from './controller.js';
import { Group } from '../entities/group.js';
import { GroupsMongoRepo } from '../repositories/groups/groups.mongo.repo.js';

export class GroupsController extends Controller<Group> {
  constructor(protected repo: GroupsMongoRepo) {
    super(repo);
  }
}
