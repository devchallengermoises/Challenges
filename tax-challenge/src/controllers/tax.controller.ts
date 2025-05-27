import { Response } from 'express';
import { TaxService } from '../services/tax.service';
import { AuthRequest } from '../middleware/auth.middleware';
import { InMemoryTaxRepository } from '../repositories/tax.repository';
import {
  createTaxRecordHandler,
  updateTaxRecordHandler,
  deleteTaxRecordHandler,
  getTaxRecordsHandler,
  getTaxRecordByIdHandler
} from '../handlers/tax.handlers';

export class TaxController {
  private static instance: TaxController;
  private taxService: TaxService;

  private constructor() {
    const repository = new InMemoryTaxRepository();
    this.taxService = TaxService.getInstance(repository);
  }

  public static getInstance(): TaxController {
    if (!TaxController.instance) {
      TaxController.instance = new TaxController();
    }
    return TaxController.instance;
  }

  public createTaxRecord = async (req: AuthRequest, res: Response): Promise<void> => {
    const result = await createTaxRecordHandler(this.taxService)(req);
    if ('error' in result) {
      res.status(400).json(result);
    } else {
      res.status(201).json(result);
    }
  };

  public updateTaxRecord = async (req: AuthRequest, res: Response): Promise<void> => {
    const result = await updateTaxRecordHandler(this.taxService)(req);
    if ('error' in result) {
      res.status(400).json(result);
    } else {
      res.json(result);
    }
  };

  public deleteTaxRecord = async (req: AuthRequest, res: Response): Promise<void> => {
    const result = await deleteTaxRecordHandler(this.taxService)(req);
    if ('error' in result) {
      res.status(400).json(result);
    } else {
      res.status(204).send();
    }
  };

  public getTaxRecords = async (req: AuthRequest, res: Response): Promise<void> => {
    const result = await getTaxRecordsHandler(this.taxService)(req);
    if ('error' in result) {
      res.status(400).json(result);
    } else {
      res.json(result);
    }
  };

  public getTaxRecordById = async (req: AuthRequest, res: Response): Promise<void> => {
    const result = await getTaxRecordByIdHandler(this.taxService)(req);
    if ('error' in result) {
      res.status(400).json(result);
    } else {
      res.json(result);
    }
  };
} 