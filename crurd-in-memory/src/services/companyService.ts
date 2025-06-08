import { Company } from '../types';
import { getCompanies } from '../providers/secProvider';


let companies: Company[];
let companyMap: Map<string, Company> = new Map();

export async function initializeCompanies(): Promise<void> {
    try {
        companies = await getCompanies();
        companyMap = new Map(companies.map(company => [company.ticker, company]));
    } catch(e) {
        throw new Error('failed to initialize companies');
    }
}

export async function getCompanyByTicker(ticker:string): Promise<Company | null> {
    return companyMap.get(ticker.toUpperCase()) || null;
}