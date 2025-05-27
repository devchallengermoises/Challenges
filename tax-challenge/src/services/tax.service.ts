import { TaxRecord, TaxQueryParams, TaxStatus, TaxCategory } from '../types/tax';
import { ApiResponse } from '../types/response';
import { ITaxService } from '../interfaces/tax.interface';
import { ITaxRepository } from '../interfaces/tax.interface';

export class TaxService implements ITaxService {
  private static instance: TaxService;
  private repository: ITaxRepository;

  private constructor(repository: ITaxRepository) {
    this.repository = repository;
  }

  public static getInstance(repository: ITaxRepository): TaxService {
    if (!TaxService.instance) {
      TaxService.instance = new TaxService(repository);
    }
    return TaxService.instance;
  }

  private binarySearch(records: TaxRecord[], id: string): number {
    let left = 0;
    let right = records.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (records[mid].id === id) {
        return mid;
      }
      if (records[mid].id < id) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return -1;
  }

  public async addTaxRecord(record: Omit<TaxRecord, 'id' | 'timestamp'>): Promise<ApiResponse<TaxRecord>> {
    const newRecord = await this.repository.create(record);
    return { data: newRecord };
  }

  public async modifyTaxRecord(id: string, updates: Partial<TaxRecord>): Promise<ApiResponse<TaxRecord> | null> {
    const updatedRecord = await this.repository.update(id, updates);
    return updatedRecord ? { data: updatedRecord } : null;
  }

  public async removeTaxRecord(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  public async getTaxRecordById(id: string): Promise<ApiResponse<TaxRecord> | null> {
    const record = await this.repository.findById(id);
    return record ? { data: record } : null;
  }

  public async getTaxRecords(params: TaxQueryParams): Promise<ApiResponse<TaxRecord[]>> {
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