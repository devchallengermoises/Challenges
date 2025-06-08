import { Request, Response } from 'express';
import { getCompanyByTicker } from '../services/companyService';
import { recordActivity, getMostPopular } from '../services/activityService'


export async function getTicker(req: Request, res: Response): Promise<void> {
    try {
       const { ticker } = req.params;
       const company = await getCompanyByTicker(ticker);

       if (!company) {
           res.status(404).send({ error: 'No such ticker found' });
           return;
       }

       recordActivity(ticker);
       res.status(200).json(company);
    } catch (error) {
        console.error('Error fetching company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export function getActivity(req: Request, res: Response): void {
    try {
        const activities = getMostPopular();
        res.status(200).json(activities);
    } catch (error) {
        console.error('Error fetching activity summary:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

