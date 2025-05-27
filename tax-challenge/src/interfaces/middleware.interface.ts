import { Request, Response, NextFunction } from 'express';

export interface IMiddleware {
  (req: Request, res: Response, next: NextFunction): Promise<void> | void;
}

export interface IAuthMiddleware extends IMiddleware {
  validateToken(req: Request, res: Response, next: NextFunction): Promise<void>;
  validateRole(role: string): IMiddleware;
}

export interface IErrorMiddleware extends IMiddleware {
  handleError(error: Error, req: Request, res: Response, next: NextFunction): void;
  notFound(req: Request, res: Response, next: NextFunction): void;
} 