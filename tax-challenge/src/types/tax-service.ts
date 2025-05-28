import { TaxRecord, TaxQueryParams } from './tax';
import { ApiResponse } from './response';

export type TaxService = {
  addTaxRecord(record: Omit<TaxRecord, 'id' | 'timestamp'>): Promise<ApiResponse<TaxRecord>>;
  modifyTaxRecord(id: string, updates: Partial<TaxRecord>): Promise<ApiResponse<TaxRecord> | null>;
  removeTaxRecord(id: string): Promise<boolean>;
  getTaxRecordById(id: string): Promise<ApiResponse<TaxRecord> | null>;
  getTaxRecords(params: TaxQueryParams): Promise<ApiResponse<TaxRecord[]>>;
}

export type TaxRepository = {
  create(record: Omit<TaxRecord, 'id' | 'timestamp'>): Promise<TaxRecord>;
  update(id: string, updates: Partial<TaxRecord>): Promise<TaxRecord | null>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<TaxRecord | null>;
  findAll(params: TaxQueryParams): Promise<{ records: TaxRecord[]; total: number }>;
} 