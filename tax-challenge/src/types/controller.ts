import { Request, Response } from 'express';

export type Controller = {
  handle(req: Request, res: Response): Promise<void>;
}

export type AuthController = Controller & {
  login(req: Request, res: Response): Promise<void>;
  register(req: Request, res: Response): Promise<void>;
  logout(req: Request, res: Response): Promise<void>;
}

export type TaxController = Controller & {
  createTaxRecord(req: Request, res: Response): Promise<void>;
  updateTaxRecord(req: Request, res: Response): Promise<void>;
  deleteTaxRecord(req: Request, res: Response): Promise<void>;
  getTaxRecordById(req: Request, res: Response): Promise<void>;
  getTaxRecords(req: Request, res: Response): Promise<void>;
} 