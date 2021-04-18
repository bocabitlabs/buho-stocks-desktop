import { IDividendsTransaction } from "types/dividends-transaction";
import { ISharesTransaction } from "types/shares-transaction";
import { ICompanyDividends } from "../dividends-part/dividends-part";
import { ICompanyInvestment } from "../investment-part/investment-part";
import { ICompanyPortfolioValue } from "../portfolio-value/portfolio-value-part";

export interface ICompanyReturns {
  sharesTransactions: ISharesTransaction[];
  dividendsTransactions: IDividendsTransaction[];
  investment: ICompanyInvestment;
  dividends: ICompanyDividends;
  portfolioValue: ICompanyPortfolioValue;
  closed: boolean;

  getReturn(inPortfolioCurrency?: boolean): number;
  getReturnForYear(year: string, inPortfolioCurrency?: boolean): number;
  getReturnWithDividends(
    inPortfolioCurrency?: boolean,
    includeCommission?: boolean
  ): number;
  getReturnWithDividendsForYear(
    year: string,
    inPortfolioCurrency?: boolean,
    includeCommission?: boolean
  ): number;
  getReturnWithDividendsPercentage(
    inPortfolioCurrency?: boolean,
    includeCommission?: boolean
  ): number;
  getReturnFromSalesForYear(
    year: string,
    inPortfolioCurrency?: boolean
  ): number;
  getReturnFromSales(inPortfolioCurrency?: boolean): number;
  getReturnPercentage(inPortfolioCurrency?: boolean): number;
  getReturnPercentageForYear(
    year: string,
    inPortfolioCurrency?: boolean
  ): number;
  getReturnPercentageForYearWithDiviends(
    year: string,
    inPortfolioCurrency?: boolean,
    includeCommission?: boolean
  ): number;
  getReturnPercentageCumulativeForYear(
    year: string,
    inPortfolioCurrency?: boolean
  ): number;
  getReturnPercentageCumulativeWithDividendsForYear(
    year: string,
    inPortfolioCurrency?: boolean
  ): number;
}