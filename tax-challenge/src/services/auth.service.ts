import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { config } from '../config';
import { User } from '../types/user';
import { IAuthService, ITokenPayload } from '../interfaces/auth.interface';
import { IAuthRepository } from '../interfaces/auth.interface';

dotenv.config();

export class AuthService implements IAuthService {
  private static instance: AuthService;
  private readonly JWT_SECRET: Secret;
  private readonly JWT_EXPIRES_IN: string;
  private readonly repository: IAuthRepository;

  private constructor(repository: IAuthRepository) {
    this.JWT_SECRET = Buffer.from(config.jwt.secret, 'utf-8');
    this.JWT_EXPIRES_IN = config.jwt.expiresIn;
    this.repository = repository;
  }

  public static getInstance(repository: IAuthRepository): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(repository);
    }
    return AuthService.instance;
  }

  public async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.repository.findByUsername(username);
    if (!user) return null;

    const isValid = await this.repository.validatePassword(user, password);
    return isValid ? user : null;
  }

  public generateToken(user: User): string {
    const payload: ITokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    const options: SignOptions = {
      expiresIn: this.JWT_EXPIRES_IN as any
    };

    return jwt.sign(payload, this.JWT_SECRET, options);
  }

  public verifyToken(token: string): ITokenPayload {
    try {
      return jwt.verify(token, this.JWT_SECRET) as ITokenPayload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
} 