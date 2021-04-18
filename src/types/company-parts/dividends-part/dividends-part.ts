import { IDividendsTransaction } from "types/dividends-transaction";

export interface ICompanyDividends {
  dividendsTransactions: IDividendsTransaction[];
  getDividendsAmount(
    inPortfolioCurrency?: boolean,
    includeCommission?: boolean
  ): number;
  getCumulativeDividendsAmountForYear(
    year: string,
    inPortfolioCurrency?: boolean,
    includeCommission?: boolean
  ): number;
  getDividendsAmountForYear(
    year: string,
    inPortfolioCurrency?: boolean,
    includeCommission?: boolean
  ): number;
  getMonthlyDividendsForYear(
    year: string,
    inPortfolioCurrency?: boolean
  ): number;
}