import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from '../types/user';

export type TokenPayload = {
  id: string;
  email: string;
  role: string;
};

export type AuthRepository = {
  findByUsername(username: string): Promise<User | null>;
  validatePassword(user: User, password: string): Promise<boolean>;
  createUser(userData: Omit<User, 'id'>): Promise<User>;
};

export interface AuthService {
  validateUser(username: string, password: string): Promise<User | null>;
  generateToken(user: User): string;
  verifyToken(token: string): TokenPayload;
}

dotenv.config();

export class AuthServiceImpl implements AuthService {
  private static instance: AuthServiceImpl;
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRES_IN: string;

  private constructor(private readonly repository: AuthRepository) {
    this.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    this.JWT_EXPIRES_IN = process.env.JWT_EXPIRATION || '1h';
  }

  public static getInstance(repository: AuthRepository): AuthServiceImpl {
    if (!AuthServiceImpl.instance) {
      AuthServiceImpl.instance = new AuthServiceImpl(repository);
    }
    return AuthServiceImpl.instance;
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.repository.findByUsername(username);
    if (!user) return null;

    const isValid = await this.repository.validatePassword(user, password);
    return isValid ? user : null;
  }

  generateToken(user: User): string {
    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
  }

  verifyToken(token: string): TokenPayload {
    return jwt.verify(token, this.JWT_SECRET) as TokenPayload;
  }
} 