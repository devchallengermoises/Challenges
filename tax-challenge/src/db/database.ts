import { User } from '../types/user';
import { TaxRecord, TaxStatus, TaxCategory } from '../types/tax';

export interface Database {
  users: User[];
  taxRecords: TaxRecord[];
}

const adminUser: User = {
  id: '1',
  username: 'admin',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'ADMIN',
  createdAt: new Date(),
  updatedAt: new Date()
};

const taxRecords: TaxRecord[] = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  taxpayerId: '1',
  year: 2024,
  amount: 1000 + i * 10,
  status: i % 2 === 0 ? TaxStatus.PENDING : TaxStatus.PAID,
  category: i % 3 === 0 ? TaxCategory.INCOME : TaxCategory.PROPERTY,
  timestamp: Date.now() - i * 1000000,
  description: `Demo tax record #${i + 1}`
}));

export const db: Database = {
  users: [adminUser],
  taxRecords
}; 