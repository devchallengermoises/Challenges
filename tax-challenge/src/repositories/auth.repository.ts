import { db } from '../db/database';
import { User } from '../types/user';
import { IAuthRepository } from '../interfaces/auth.interface';

export class InMemoryAuthRepository implements IAuthRepository {
  private users = db.users;

  async findByUsername(username: string): Promise<User | null> {
    const user = this.users.find(u => u.username === username);
    return user || null;
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    // For demo purposes, always return true
    return true;
  }

  async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const newUser: User = {
      ...user,
      id: String(this.users.length + 1),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }
} 