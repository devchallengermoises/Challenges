import { Activity } from '../types/activity';

const activities: Activity[] = [];

export function recordActivity(ticker: string): void {
    activities.push({
        ticker: ticker.toUpperCase(),
        timestamp: new Date()
    });
}

export function getMostPopular(): Record<string, number> {
    const popular: Record<string, number> = {};
    activities.forEach(a => {
        popular[a.ticker] = (popular[a.ticker] || 0) + 1;
    });
    return popular;
}