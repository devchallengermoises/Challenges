import { Router } from 'express';
import { AuthServiceImpl } from '../services/auth.service';
import { TaxServiceImpl } from '../services/tax.service';
import { InMemoryAuthRepository } from '../repositories/auth.repository';
import { InMemoryTaxRepository } from '../repositories/tax.repository';
import { TaxControllerImpl } from '../controllers/tax.controller';

const router = Router();

// Initialize repositories
const authRepository = new InMemoryAuthRepository();
const taxRepository = new InMemoryTaxRepository();

// Initialize services
const authService = AuthServiceImpl.getInstance(authRepository);
const taxService = TaxServiceImpl.getInstance(taxRepository);

// Initialize controllers
const taxController = new TaxControllerImpl(taxService);

// Auth routes
router.post('/auth/register', async (req, res) => {
  try {
    const user = await authRepository.createUser(req.body);
    const token = authService.generateToken(user);
    res.status(201).json({ data: { user, token } });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const user = await authService.validateUser(req.body.username, req.body.password);
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    const token = authService.generateToken(user);
    res.json({ 
      data: { 
        user: { username: user.username },
        token 
      } 
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

// Tax routes
router.post('/tax', taxController.createTaxRecord.bind(taxController));
router.put('/tax/:id', taxController.updateTaxRecord.bind(taxController));
router.delete('/tax/:id', taxController.deleteTaxRecord.bind(taxController));
router.get('/tax/:id', taxController.getTaxRecordById.bind(taxController));
router.get('/tax', taxController.getTaxRecords.bind(taxController));

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default router; 