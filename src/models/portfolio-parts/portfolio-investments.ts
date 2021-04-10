import { ICompany } from "types/company";
import { IPortfolio, IPortfolioInvestments } from "types/portfolio";


export class PortfolioInvestments implements IPortfolioInvestments {
  portfolio: IPortfolio;
  constructor(portfolio: IPortfolio) {
    this.portfolio = portfolio;
  }

  getTotalInvested(inBaseCurrency: boolean) {
    const totalInvested = this.portfolio.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      return accumulator + obj.investment.getTotalInvested(inBaseCurrency);
    },
    0);
    return totalInvested;
  }

  getTotalInvestedOnYear(year: string, inBaseCurrency: boolean) {
    const totalInvested = this.portfolio.companies.reduce(function (
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
    const totalInvested = this.portfolio.companies.reduce(function (
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