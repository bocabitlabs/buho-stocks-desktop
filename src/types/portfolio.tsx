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
  companies: ICompany[];
  getPortfolioValueWithInflation(inBaseCurrency?: boolean): number;
}
