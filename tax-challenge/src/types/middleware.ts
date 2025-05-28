import { Request, Response, NextFunction } from 'express';

export type Middleware = {
  (req: Request, res: Response, next: NextFunction): Promise<void> | void;
}

export type AuthMiddleware = Middleware & {
  validateToken(req: Request, res: Response, next: NextFunction): Promise<void>;
  validateRole(role: string): Middleware;
}

export type ErrorMiddleware = Middleware & {
  handleError(error: Error, req: Request, res: Response, next: NextFunction): void;
  notFound(req: Request, res: Response, next: NextFunction): void;
} 