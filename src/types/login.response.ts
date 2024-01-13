import { User } from '../entitites/user';

export type LoginResponse = {
  user: User;
  token: string;
};
