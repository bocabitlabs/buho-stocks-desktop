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
  companies: ICompany[];
  getPortfolioValueWithInflation(inBaseCurrency?: boolean): number;
  getPortfolioDividends(year?:string, inBaseCurrency?: boolean): number;
  getMonthlyDividendsForYear(year: string, inBaseCurrency?: boolean): number;
}
