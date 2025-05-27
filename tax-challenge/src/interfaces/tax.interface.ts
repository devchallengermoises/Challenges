import { TaxRecord, TaxQueryParams } from '../types/tax';
import { ApiResponse } from '../types/response';

export interface ITaxService {
  addTaxRecord(record: Omit<TaxRecord, 'id' | 'timestamp'>): Promise<ApiResponse<TaxRecord>>;
  modifyTaxRecord(id: string, updates: Partial<TaxRecord>): Promise<ApiResponse<TaxRecord> | null>;
  removeTaxRecord(id: string): Promise<boolean>;
  getTaxRecordById(id: string): Promise<ApiResponse<TaxRecord> | null>;
  getTaxRecords(params: TaxQueryParams): Promise<ApiResponse<TaxRecord[]>>;
}

export interface ITaxRepository {
  create(record: Omit<TaxRecord, 'id' | 'timestamp'>): Promise<TaxRecord>;
  update(id: string, updates: Partial<TaxRecord>): Promise<TaxRecord | null>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<TaxRecord | null>;
  findAll(params: TaxQueryParams): Promise<{ records: TaxRecord[]; total: number }>;
} 