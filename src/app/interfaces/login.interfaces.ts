import { User } from './posts.interfaces';

export interface LoginResponse {
  ok: boolean;
  token: string;
  message: string;
}

export interface UserResponse {
  ok: true;
  user: User;
}
