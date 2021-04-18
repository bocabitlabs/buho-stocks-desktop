import { ICompany } from "./company";
import { IPortfolioDividends } from "./portfolio-parts/dividends-part/dividends-part";
import { IPortfolioInvestments } from "./portfolio-parts/investments-part/investments-part";
import { IPortfolioReturns } from "./portfolio-parts/returns-part/returns-part";

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
  // Composition
  dividends: IPortfolioDividends;
  returns: IPortfolioReturns;
  investments: IPortfolioInvestments;

  getPortfolioValue(inBaseCurrency?: boolean): number;
  getPortfolioValueForYear(year: string, inBaseCurrency?: boolean): number;
}
