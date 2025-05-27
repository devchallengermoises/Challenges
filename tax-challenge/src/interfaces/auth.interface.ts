import { User } from '../types/user';

export interface ITokenPayload {
  id: string;
  email: string;
  role: string;
}

export interface IAuthService {
  validateUser(username: string, password: string): Promise<User | null>;
  generateToken(user: User): string;
  verifyToken(token: string): ITokenPayload;
}

export interface IAuthRepository {
  findByUsername(username: string): Promise<User | null>;
  validatePassword(user: User, password: string): Promise<boolean>;
  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
} 