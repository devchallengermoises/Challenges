import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { AuthService } from './services/auth.service';
import { TaxController } from './controllers/tax.controller';
import { authMiddleware, adminMiddleware } from './middleware/auth.middleware';
import { InMemoryAuthRepository } from './repositories/auth.repository';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3007;
const version = '1.0.0';

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
});
app.use(limiter);

// Initialize repositories
const authRepository = new InMemoryAuthRepository();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const authService = AuthService.getInstance(authRepository);
  
  const user = await authService.validateUser(username, password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = authService.generateToken(user);
  res.json({ token });
});

// Tax routes
const taxController = TaxController.getInstance();

// Protected routes
app.use('/api/tax', authMiddleware);

// Tax endpoints
app.post('/api/tax', taxController.createTaxRecord);
app.get('/api/tax', taxController.getTaxRecords);
app.get('/api/tax/:id', taxController.getTaxRecordById);
app.put('/api/tax/:id', taxController.updateTaxRecord);
app.delete('/api/tax/:id', adminMiddleware, taxController.deleteTaxRecord);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`
🚀 HavenTax API Server
─────────────────────
📦 Version: ${version}
🌍 Environment: ${process.env.NODE_ENV}
🔌 Port: ${port}
📝 API Documentation: http://localhost:${port}/api/health
─────────────────────
  `);
}); 