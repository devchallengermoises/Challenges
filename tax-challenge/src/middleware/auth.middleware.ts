import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { InMemoryAuthRepository } from '../repositories/auth.repository';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

const authRepository = new InMemoryAuthRepository();

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: 'No token provided', code: 'UNAUTHORIZED' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const authService = AuthService.getInstance(authRepository);
    const decoded = authService.verifyToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token', code: 'UNAUTHORIZED' });
  }
};

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}; 