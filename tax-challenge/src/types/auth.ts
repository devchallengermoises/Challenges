import { User } from './user';

export type TokenPayload = {
  id: string;
  email: string;
  role: string;
}

export type AuthService = {
  validateUser(username: string, password: string): Promise<User | null>;
  generateToken(user: User): string;
  verifyToken(token: string): TokenPayload;
}

export type AuthRepository = {
  findByUsername(username: string): Promise<User | null>;
  validatePassword(user: User, password: string): Promise<boolean>;
  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
} 