import { Router } from 'express';
import { getTicker, getActivity } from '../controllers/companyController';

const router = Router();

router.get('/ticker/:ticker', getTicker);
router.get('/activity', getActivity);
router.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'company-api',
        version: '1.0.0'
    });
});

export default router;