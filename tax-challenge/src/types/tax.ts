import { ApiResponse } from './response';

export enum TaxStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED'
}

export enum TaxCategory {
  INCOME = 'INCOME',
  PROPERTY = 'PROPERTY',
  SALES = 'SALES',
  CORPORATE = 'CORPORATE'
}

export interface TaxRecord {
  id: string;
  taxpayerId: string;
  year: number;
  amount: number;
  status: TaxStatus;
  category: TaxCategory;
  timestamp: number;
  description?: string;
}

export interface TaxQueryParams {
  page: number;
  limit: number;
  year?: number;
  status?: TaxStatus;
  category?: TaxCategory;
  startDate?: number;
  endDate?: number;
}

export interface ITaxRepository {
  create(record: Omit<TaxRecord, 'id' | 'timestamp'>): TaxRecord;
  update(id: string, updates: Partial<TaxRecord>): TaxRecord | null;
  delete(id: string): boolean;
  findById(id: string): TaxRecord | null;
  findAll(params: TaxQueryParams): { records: TaxRecord[]; total: number };
}

export interface ITaxService {
  addTaxRecord(record: Omit<TaxRecord, 'id' | 'timestamp'>): ApiResponse<TaxRecord>;
  modifyTaxRecord(id: string, updates: Partial<TaxRecord>): ApiResponse<TaxRecord> | null;
  removeTaxRecord(id: string): boolean;
  getTaxRecordById(id: string): ApiResponse<TaxRecord> | null;
  getTaxRecords(params: TaxQueryParams): ApiResponse<TaxRecord[]>;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface TaxResponse {
  data: TaxRecord[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
} 