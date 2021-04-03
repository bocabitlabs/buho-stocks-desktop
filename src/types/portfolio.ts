import { ICompany } from "./company";

export interface PortfolioFormFields {
  name: string;
  description: string;
  color: string;
  currencyId: number;
}

export interface IPortfolioDividends {
  getDividends(inBaseCurrency?: boolean): number;
  getDividendsForYear(year?: string, inBaseCurrency?: boolean): number;
  getCumulativeDividendsForYear(
    year?: string,
    inBaseCurrency?: boolean
  ): number;
  getCumulativePortfolioDividendsAmountForYear(
    year?: string,
    inBaseCurrency?: boolean
  ): number;
  getMonthlyDividendsForYear(year: string, inBaseCurrency?: boolean): number;
}

export interface IPortfolioReturns {
  getReturnForYear(year: string, inBaseCurrency?: boolean): number;
  getReturnPercentageCumulativeForYear(
    year: string,
    inBaseCurrency?: boolean
  ): number;
  getReturnPercentageForYear(year: string, inBaseCurrency?: boolean): number;
  getReturnWithDividends(inBaseCurrency?: boolean): number;
  getReturnWithDividendsPercentage(inBaseCurrency?: boolean): number;
  getReturnWithDividendsForYear(year: string, inBaseCurrency?: boolean): number;
  getReturnPercentageWithDividendsForYearCumulative(
    year: string,
    inBaseCurrency?: boolean
  ): number;
}

export interface IPortfolio extends PortfolioFormFields {
  id: string;
  currencySymbol: string;
  currencyName: string;
  currencyAbbreviation: string;
  currencyCountryCode: string;
  companies: ICompany[];
  dividends: IPortfolioDividends;
  returns: IPortfolioReturns;

  getPortfolioValue(inBaseCurrency?: boolean): number;
  getPortfolioValueForYear(year: string, inBaseCurrency?: boolean): number;
  getTotalInvested(inBaseCurrency?: boolean): number;
  getTotalInvestedOnYear(year: string, inBaseCurrency?: boolean): number;
  getTotalInvestedUntilYear(year: string, inBaseCurrency?: boolean): number;
  getPortfolioValueWithInflation(inBaseCurrency?: boolean): number;
}
