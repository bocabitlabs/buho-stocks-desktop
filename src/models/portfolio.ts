import { ICompany } from "types/company";
import { IPortfolio } from "types/portfolio";
import { IPortfolioDividends } from "types/portfolio-parts/dividends-part/dividends-part";
import { IPortfolioInvestments } from "types/portfolio-parts/investments-part/investment-part";
import { IPortfolioReturns } from "types/portfolio-parts/returns-part/returns-part";
import { PortfolioDividends } from "./portfolio-parts/dividends-part/portfolio-dividends";
import { PortfolioInvestment } from "./portfolio-parts/investment-part/portfolio-investment";
import { PortfolioReturns } from "./portfolio-parts/returns-part/portfolio-returns";
import { IPortfolioValue } from "types/portfolio-parts/value-part/portfolio-value-part";
import { PortfolioValue } from "./portfolio-parts/value-part/portfolio-value-part";

export class Portfolio implements IPortfolio {
  id: string;
  currencySymbol: string;
  currencyName: string;
  currencyAbbreviation: string;
  currencyCountryCode: string;
  name: string;
  description: string;
  color: string;
  currencyId: number;
  companies: ICompany[];
  dividends: IPortfolioDividends;
  returns: IPortfolioReturns;
  investments: IPortfolioInvestments;
  value: IPortfolioValue;

  constructor(parameters: IPortfolio) {
    this.id = parameters.id;
    this.currencySymbol = parameters.currencySymbol;
    this.currencyName = parameters.currencyName;
    this.currencyAbbreviation = parameters.currencyAbbreviation;
    this.currencyCountryCode = parameters.currencyCountryCode;
    this.name = parameters.name;
    this.description = parameters.description;
    this.color = parameters.color;
    this.currencyId = parameters.currencyId;
    this.companies = parameters.companies;
    this.dividends = new PortfolioDividends(this.companies);
    this.returns = new PortfolioReturns(this.companies);
    this.investments = new PortfolioInvestment(this.companies);
    this.value = new PortfolioValue(this.companies)
  }
}
