import { Request } from 'express';
import { TaxService } from '../services/tax.service';
import { AuthRequest } from '../middleware/auth.middleware';
import { TaxRecord, TaxQueryParams, TaxStatus, TaxCategory } from '../types/tax';
import { ApiResponse, ApiError } from '../types/response';

const parseQueryParams = (req: Request): TaxQueryParams => {
  const { page = '1', limit = '10', year, status, category, startDate, endDate } = req.query;
  return {
    page: parseInt(page as string, 10),
    limit: parseInt(limit as string, 10),
    year: year ? parseInt(year as string, 10) : undefined,
    status: status as TaxStatus | undefined,
    category: category as TaxCategory | undefined,
    startDate: startDate ? new Date(startDate as string).getTime() : undefined,
    endDate: endDate ? new Date(endDate as string).getTime() : undefined
  };
};

const handleError = (error: Error): ApiError => {
  return {
    error: error.message || 'Internal Server Error',
    code: 'INTERNAL_ERROR'
  };
};

export const createTaxRecordHandler = (taxService: TaxService) => async (req: AuthRequest): Promise<ApiResponse<TaxRecord> | ApiError> => {
  try {
    if (!req.user) {
      return { error: 'Unauthorized', code: 'UNAUTHORIZED' };
    }

    const taxRecord = await taxService.addTaxRecord({
      ...req.body,
      taxpayerId: req.user.id
    });

    return taxRecord;
  } catch (error) {
    return handleError(error as Error);
  }
};

export const updateTaxRecordHandler = (taxService: TaxService) => async (req: AuthRequest): Promise<ApiResponse<TaxRecord> | ApiError> => {
  try {
    if (!req.user) {
      return { error: 'Unauthorized', code: 'UNAUTHORIZED' };
    }

    const { id } = req.params;
    const updatedRecord = await taxService.modifyTaxRecord(id, req.body);

    if (!updatedRecord) {
      return { error: 'Tax record not found', code: 'NOT_FOUND' };
    }

    return updatedRecord;
  } catch (error) {
    return handleError(error as Error);
  }
};

export const deleteTaxRecordHandler = (taxService: TaxService) => async (req: AuthRequest): Promise<ApiResponse<null> | ApiError> => {
  try {
    if (!req.user) {
      return { error: 'Unauthorized', code: 'UNAUTHORIZED' };
    }

    const { id } = req.params;
    const success = await taxService.removeTaxRecord(id);

    if (!success) {
      return { error: 'Tax record not found', code: 'NOT_FOUND' };
    }

    return { data: null };
  } catch (error) {
    return handleError(error as Error);
  }
};

export const getTaxRecordsHandler = (taxService: TaxService) => async (req: AuthRequest): Promise<ApiResponse<TaxRecord[]> | ApiError> => {
  try {
    if (!req.user) {
      return { error: 'Unauthorized', code: 'UNAUTHORIZED' };
    }

    const params = parseQueryParams(req);
    const result = await taxService.getTaxRecords(params);

    return result;
  } catch (error) {
    return handleError(error as Error);
  }
};

export const getTaxRecordByIdHandler = (taxService: TaxService) => async (req: AuthRequest): Promise<ApiResponse<TaxRecord> | ApiError> => {
  try {
    if (!req.user) {
      return { error: 'Unauthorized', code: 'UNAUTHORIZED' };
    }

    const { id } = req.params;
    const record = await taxService.getTaxRecordById(id);

    if (!record) {
      return { error: 'Tax record not found', code: 'NOT_FOUND' };
    }

    return record;
  } catch (error) {
    return handleError(error as Error);
  }
}; 