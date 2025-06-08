import axios from 'axios';
import { Company, SECResponse } from '../types';
import dotenv from 'dotenv';

dotenv.config();

const SEC_API_HEADERS = {
    'User-Agent': `${process.env.SEC_API_USER_NAME} (${process.env.SEC_API_USER_EMAIL})`
};

const SEC_API_URL = 'https://www.sec.gov/files/company_tickers_exchange.json';

export async function getCompanies(): Promise<Company[]> {
    const rawData = await getSECData();
    return processData(rawData);
}
 async function getSECData(): Promise<SECResponse> {
    try {
        const response = await axios.get<SECResponse>(SEC_API_URL, { headers:SEC_API_HEADERS})
        return response.data;
    } catch(e){
        throw new Error('Fail!!!')

    }
 }
 function processData(rawData: SECResponse) : Company[] {
    return rawData.data.map(([cik, name, ticker, exchange]) =>({
        cik,
        name,
        ticker,
        exchange
    }));
 }



