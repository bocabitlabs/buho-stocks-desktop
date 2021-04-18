import { ICompany } from "types/company";
import { IPortfolio } from "types/portfolio";
import { IPortfolioDividends } from "types/portfolio-parts/dividends-part/dividends-part";
import { IPortfolioInvestments } from "types/portfolio-parts/investments-part/investments-part";
import { IPortfolioReturns } from "types/portfolio-parts/returns-part/returns-part";
import { PortfolioDividends } from "./portfolio-parts/portfolio-dividends";
import { PortfolioInvestments } from "./portfolio-parts/portfolio-investments";
import { PortfolioReturns } from "./portfolio-parts/portfolio-returns";

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
    this.dividends = new PortfolioDividends(this);
    this.returns = new PortfolioReturns(this);
    this.investments = new PortfolioInvestments(this);
  }

  getPortfolioValue(inBaseCurrency = false): number {
    const totalPortfolioValue = this.companies
      .filter((company) => !company.closed)
      .reduce(function (accumulator: number, obj: ICompany) {
        return (
          accumulator + obj.portfolioValue.getPortfolioValue(inBaseCurrency)
        );
      }, 0);
    return totalPortfolioValue;
  }

  getPortfolioValueForYear(year: string, inBaseCurrency = false): number {
    console.debug(`Portfolio value: for year ${year}`);
    let accumulated = this.companies
      .filter((company) => !company.closed)
      .reduce(function (accumulator: number, obj: ICompany) {
        return (
          accumulator +
          obj.portfolioValue.getPortfolioValueForYear(year, inBaseCurrency)
        );
      }, 0);
    console.debug(`Portfolio value: for year ${year} = ${accumulated}`);

    return accumulated;
  }
}
