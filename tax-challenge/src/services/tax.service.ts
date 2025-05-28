import { TaxRecord, TaxQueryParams } from '../types/tax';
import { ApiResponse } from '../types/response';

export type TaxRepository = {
  create(record: Omit<TaxRecord, 'id' | 'timestamp'>): Promise<TaxRecord>;
  update(id: string, updates: Partial<TaxRecord>): Promise<TaxRecord | null>;
  delete(id: string): Promise<TaxRecord | null>;
  findById(id: string): Promise<TaxRecord | null>;
  findAll(params: TaxQueryParams): Promise<{ records: TaxRecord[]; total: number }>;
};

export interface TaxService {
  addTaxRecord(record: Omit<TaxRecord, 'id' | 'timestamp'>): Promise<ApiResponse<TaxRecord>>;
  modifyTaxRecord(id: string, updates: Partial<TaxRecord>): Promise<ApiResponse<TaxRecord> | null>;
  removeTaxRecord(id: string): Promise<ApiResponse<TaxRecord> | null>;
  getTaxRecordById(id: string): Promise<ApiResponse<TaxRecord> | null>;
  getTaxRecords(params: TaxQueryParams): Promise<ApiResponse<TaxRecord[]>>;
}

export class TaxServiceImpl implements TaxService {
  private static instance: TaxServiceImpl;

  private constructor(private readonly repository: TaxRepository) {}

  public static getInstance(repository: TaxRepository): TaxServiceImpl {
    if (!TaxServiceImpl.instance) {
      TaxServiceImpl.instance = new TaxServiceImpl(repository);
    }
    return TaxServiceImpl.instance;
  }

  async addTaxRecord(record: Omit<TaxRecord, 'id' | 'timestamp'>): Promise<ApiResponse<TaxRecord>> {
    const newRecord = await this.repository.create(record);
    return { data: newRecord };
  }

  async modifyTaxRecord(id: string, updates: Partial<TaxRecord>): Promise<ApiResponse<TaxRecord> | null> {
    const updatedRecord = await this.repository.update(id, updates);
    return updatedRecord ? { data: updatedRecord } : null;
  }

  async removeTaxRecord(id: string): Promise<ApiResponse<TaxRecord> | null> {
    const record = await this.repository.findById(id);
    if (!record) return null;
    
    const success = await this.repository.delete(id);
    return success ? { data: record } : null;
  }

  async getTaxRecordById(id: string): Promise<ApiResponse<TaxRecord> | null> {
    const record = await this.repository.findById(id);
    return record ? { data: record } : null;
  }

  async getTaxRecords(params: TaxQueryParams): Promise<ApiResponse<TaxRecord[]>> {
    const { records, total } = await this.repository.findAll(params);
    return {
      data: records,
      meta: {
        total,
        page: params.page,
        limit: params.limit,
        totalPages: Math.ceil(total / params.limit)
      }
    };
  }
} 