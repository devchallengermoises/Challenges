export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
  createdAt: Date;
  updatedAt: Date;
} 