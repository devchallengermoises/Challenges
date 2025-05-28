import { User } from './user';
import { TaxRecord } from './tax';

export type Database = {
  users: User[];
  taxRecords: TaxRecord[];
} 