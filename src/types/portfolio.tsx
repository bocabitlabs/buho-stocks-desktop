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
  getTotalInvested(inBaseCurrency?: boolean): number;
  getTotalInvestedForYear(year:string, inBaseCurrency?: boolean): number;
  getPortfolioValueWithInflation(inBaseCurrency?: boolean): number;
  getAllPortfolioDividends(inBaseCurrency?: boolean): number;
  getPortfolioDividends(year?:string, inBaseCurrency?: boolean): number;
  getMonthlyDividendsForYear(year: string, inBaseCurrency?: boolean): number;
  getReturnWithDividends(inBaseCurrency?: boolean): number;
  getReturnWithDividendsPercentage(inBaseCurrency?: boolean): number;
}
