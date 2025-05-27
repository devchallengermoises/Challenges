import { Request, Response } from 'express';

export interface IController {
  handle(req: Request, res: Response): Promise<void>;
}

export interface IAuthController extends IController {
  login(req: Request, res: Response): Promise<void>;
  register(req: Request, res: Response): Promise<void>;
  logout(req: Request, res: Response): Promise<void>;
}

export interface ITaxController extends IController {
  createTaxRecord(req: Request, res: Response): Promise<void>;
  updateTaxRecord(req: Request, res: Response): Promise<void>;
  deleteTaxRecord(req: Request, res: Response): Promise<void>;
  getTaxRecordById(req: Request, res: Response): Promise<void>;
  getTaxRecords(req: Request, res: Response): Promise<void>;
} 