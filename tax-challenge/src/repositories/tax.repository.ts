import { db } from '../db/database';
import { v4 as uuidv4 } from 'uuid';
import { TaxRecord, TaxQueryParams, TaxStatus, TaxCategory } from '../types/tax';
import { ITaxRepository } from '../interfaces/tax.interface';

export class InMemoryTaxRepository implements ITaxRepository {
  private records = db.taxRecords;

  private binarySearch(id: string): number {
    let left = 0;
    let right = this.records.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (this.records[mid].id === id) {
        return mid;
      }
      if (this.records[mid].id < id) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return -1;
  }

  async create(record: Omit<TaxRecord, 'id' | 'timestamp'>): Promise<TaxRecord> {
    const newRecord: TaxRecord = {
      ...record,
      id: String(this.records.length + 1),
      timestamp: Date.now()
    };
    this.records.push(newRecord);
    return newRecord;
  }

  async update(id: string, updates: Partial<TaxRecord>): Promise<TaxRecord | null> {
    const index = this.binarySearch(id);
    if (index === -1) return null;

    this.records[index] = {
      ...this.records[index],
      ...updates,
      timestamp: Date.now()
    };
    return this.records[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.binarySearch(id);
    if (index === -1) return false;

    this.records.splice(index, 1);
    return true;
  }

  async findById(id: string): Promise<TaxRecord | null> {
    const index = this.binarySearch(id);
    return index === -1 ? null : this.records[index];
  }

  async findAll(params: TaxQueryParams): Promise<{ records: TaxRecord[]; total: number }> {
    let filtered = [...this.records];

    if (params.year) {
      filtered = filtered.filter(r => r.year === params.year);
    }
    if (params.status) {
      filtered = filtered.filter(r => r.status === params.status);
    }
    if (params.category) {
      filtered = filtered.filter(r => r.category === params.category);
    }
    if (params.startDate) {
      filtered = filtered.filter(r => r.timestamp >= params.startDate!);
    }
    if (params.endDate) {
      filtered = filtered.filter(r => r.timestamp <= params.endDate!);
    }

    const start = (params.page - 1) * params.limit;
    const end = start + params.limit;
    const paginated = filtered.slice(start, end);

    return {
      records: paginated,
      total: filtered.length
    };
  }
} 