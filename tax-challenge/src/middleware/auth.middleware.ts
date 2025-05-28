import { Request, Response, NextFunction } from 'express';
import { AuthServiceImpl } from '../services/auth.service';
import { InMemoryAuthRepository } from '../repositories/auth.repository';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

const authRepository = new InMemoryAuthRepository();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Invalid token format' });
    }

    // Get the auth service instance
    const authService = AuthServiceImpl.getInstance(req.app.get('authRepository'));
    const payload = authService.verifyToken(token);
    
    // Attach user info to request
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}; 