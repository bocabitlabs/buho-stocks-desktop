import { ICompany } from "types/company";
import { IPortfolio, IPortfolioDividends, IPortfolioReturns } from "types/portfolio";
import { PortfolioDividends } from "./portfolio-parts/portfolio-dividends";
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
  }

  getPortfolioValue(inBaseCurrency = false): number {
    const totalPortfolioValue = this.companies
      .filter((company) => !company.closed)
      .reduce(function (accumulator: number, obj: ICompany) {
        return accumulator + obj.getPortfolioValue(inBaseCurrency);
      }, 0);
    return totalPortfolioValue;
  }

  getPortfolioValueForYear(year: string, inBaseCurrency = false): number {
    console.debug(`Portfolio value: for year ${year}`);
    let accumulated = this.companies
      .filter((company) => !company.closed)
      .reduce(function (accumulator: number, obj: ICompany) {
        return accumulator + obj.getPortfolioValueForYear(year, inBaseCurrency);
      }, 0);
    console.debug(`Portfolio value: for year ${year} = ${accumulated}`);

    return accumulated;
  }

  getPortfolioValueWithInflation(inBaseCurrency = false): number {
    const totalPortfolioValue = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      if (inBaseCurrency) {
        return accumulator + obj.getPortfolioValueWithInflation(true);
      }
      return accumulator + obj.getPortfolioValueWithInflation();
    },
    0);
    return totalPortfolioValue;
  }

  getTotalInvested(inBaseCurrency: boolean) {
    const totalInvested = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      return accumulator + obj.investment.getTotalInvested(inBaseCurrency);
    },
    0);
    return totalInvested;
  }

  getTotalInvestedOnYear(year: string, inBaseCurrency: boolean) {
    const totalInvested = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      return (
        accumulator +
        obj.investment.getTotalInvestedOnYear(year, inBaseCurrency)
      );
    },
    0);
    return totalInvested;
  }

  getTotalInvestedUntilYear(year: string, inBaseCurrency = false): number {
    const totalInvested = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      return (
        accumulator +
        obj.investment.getTotalInvestedUntilYear(year, inBaseCurrency)
      );
    },
    0);
    return totalInvested;
  }
}
