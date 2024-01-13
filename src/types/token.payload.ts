import { User } from '../entitites/user';
import jwt from 'jsonwebtoken';

export type TokenPayload = {
  id: User['id'];
  email: string;
  role: User['role'];
} & jwt.JwtPayload;
