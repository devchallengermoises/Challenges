import { TaxRecord, TaxQueryParams, TaxStatus, TaxCategory } from '../types/tax';
import { TaxRepository } from '../services/tax.service';

export class InMemoryTaxRepository implements TaxRepository {
  private records: TaxRecord[] = [];
  private lastId: number = 0;

  constructor() {
    this.generateInitialRecords();
  }

  private generateInitialRecords() {
    const categories = [TaxCategory.INCOME, TaxCategory.PROPERTY, TaxCategory.SALES, TaxCategory.CORPORATE];
    const statuses = [TaxStatus.PENDING, TaxStatus.PAID, TaxStatus.OVERDUE];
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < 50; i++) {
      const record: TaxRecord = {
        id: (i + 1).toString(),
        taxpayerId: `TAX-${Math.floor(Math.random() * 10000)}`,
        year: currentYear - Math.floor(Math.random() * 3),
        amount: Math.floor(Math.random() * 10000) + 100,
        category: categories[Math.floor(Math.random() * categories.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        description: `Tax record ${i + 1}`,
        timestamp: Date.now() - Math.floor(Math.random() * 10000000000)
      };
      this.records.push(record);
      this.lastId = i + 1;
    }
  }

  async create(record: Omit<TaxRecord, 'id' | 'timestamp'>): Promise<TaxRecord> {
    this.lastId++;
    const newRecord: TaxRecord = {
      id: this.lastId.toString(),
      timestamp: Date.now(),
      ...record
    };
    this.records.push(newRecord);
    return newRecord;
  }

  async update(id: string, updates: Partial<TaxRecord>): Promise<TaxRecord | null> {
    const index = this.records.findIndex(record => record.id === id);
    if (index === -1) return null;

    const updatedRecord = { ...this.records[index], ...updates };
    this.records[index] = updatedRecord;
    return updatedRecord;
  }

  async delete(id: string): Promise<TaxRecord | null> {
    const index = this.records.findIndex(record => record.id === id);
    if (index === -1) return null;

    const deletedRecord = this.records[index];
    this.records.splice(index, 1);
    return deletedRecord;
  }

  async findById(id: string): Promise<TaxRecord | null> {
    return this.records.find(record => record.id === id) || null;
  }

  async findAll(params: TaxQueryParams): Promise<{ records: TaxRecord[]; total: number }> {
    const { page = 1, limit = 10 } = params;
    const start = (page - 1) * limit;
    const end = start + limit;
    const records = this.records.slice(start, end);
    return { records, total: this.records.length };
  }
} 