import { ICompany } from "./company";

export interface PortfolioFormFields {
  name: string;
  description: string;
  color: string;
  currencyId: number;
}

export interface IPortfolio extends PortfolioFormFields {
  id: string;
  currencySymbol: string;
  currencyName: string;
  currencyAbbreviation: string;
  currencyCountryCode: string;
  companies: ICompany[];
  getPortfolioValue(inBaseCurrency?: boolean): number;
  getPortfolioValueForYear(year: string, years: number[], inBaseCurrency?: boolean): number;
  getTotalInvested(inBaseCurrency?: boolean): number;
  getTotalInvestedOnYear(year:string, inBaseCurrency?: boolean): number;
  getTotalInvestedUntilYear(year:string, inBaseCurrency?: boolean): number;
  getPortfolioValueWithInflation(inBaseCurrency?: boolean): number;
  getDividends(inBaseCurrency?: boolean): number;
  getDividendsForYear(year?:string, inBaseCurrency?: boolean): number;
  getCumulativeDividendsForYear(year?:string, inBaseCurrency?: boolean): number;
  getMonthlyDividendsForYear(year: string, inBaseCurrency?: boolean): number;
  getReturnForYear(year: string, years: number[], inBaseCurrency?: boolean): number;
  getReturnPercentageCumulativeForYear(year: string, years: number[], inBaseCurrency?: boolean): number;
  getReturnPercentageForYear(year: string, years: number[], inBaseCurrency?: boolean): number
  getReturnWithDividends(inBaseCurrency?: boolean): number;
  getReturnWithDividendsPercentage(inBaseCurrency?: boolean): number;
  getReturnWithDividendsForYear(year: string, years: number[], inBaseCurrency?: boolean): number;
}
