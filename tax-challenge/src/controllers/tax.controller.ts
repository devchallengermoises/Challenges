import { Request, Response } from 'express';
import { TaxController } from '../types/controller';
import { TaxServiceImpl } from '../services/tax.service';

export class TaxControllerImpl implements TaxController {
  constructor(private readonly taxService: TaxServiceImpl) {}

  async handle(req: Request, res: Response): Promise<void> {
    res.status(404).json({ error: 'Not found' });
  }

  async createTaxRecord(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.taxService.addTaxRecord(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: 'Invalid input' });
    }
  }

  async updateTaxRecord(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.taxService.modifyTaxRecord(req.params.id, req.body);
      if (!result) {
        res.status(404).json({ error: 'Record not found' });
        return;
      }
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: 'Invalid input' });
    }
  }

  async deleteTaxRecord(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.taxService.removeTaxRecord(req.params.id);
      if (!result) {
        res.status(404).json({ error: 'Record not found' });
        return;
      }
      res.json({ 
        message: `Tax record ${req.params.id} has been successfully deleted`,
        data: result.data
      });
    } catch (error) {
      res.status(400).json({ error: 'Invalid input' });
    }
  }

  async getTaxRecordById(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.taxService.getTaxRecordById(req.params.id);
      if (!result) {
        res.status(404).json({ error: 'Record not found' });
        return;
      }
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: 'Invalid input' });
    }
  }

  async getTaxRecords(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await this.taxService.getTaxRecords({ page, limit });
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: 'Invalid input' });
    }
  }
} 