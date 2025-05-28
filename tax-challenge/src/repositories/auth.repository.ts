import { User } from '../types/user';
import { AuthRepository } from '../services/auth.service';

export class InMemoryAuthRepository implements AuthRepository {
  private users: User[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123', // In a real app, this would be hashed
      role: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find(user => user.username === username) || null;
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return user.password === password; // In a real app, use bcrypt to compare hashed passwords
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }
} 