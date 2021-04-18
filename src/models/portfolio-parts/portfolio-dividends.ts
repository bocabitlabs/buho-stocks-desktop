import { ICompany } from "types/company";
import { IPortfolio } from "types/portfolio";
import { IPortfolioDividends } from "types/portfolio-parts/dividends-part/dividends-part";

export class PortfolioDividends implements IPortfolioDividends {
  portfolio: IPortfolio;
  constructor(portfolio: IPortfolio) {
    this.portfolio = portfolio;
  }
  getDividends(inBaseCurrency = false): number {
    const amount = this.portfolio.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      if (inBaseCurrency) {
        return accumulator + obj.dividends.getDividendsAmount(inBaseCurrency);
      }
      return accumulator + obj.dividends.getDividendsAmount(inBaseCurrency);
    },
    0);
    return amount;
  }

  getDividendsForYear(year: string, inBaseCurrency = false): number {
    const amount = this.portfolio.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      return (
        accumulator +
        obj.dividends.getDividendsAmountForYear(year, inBaseCurrency)
      );
    },
    0);
    return amount;
  }

  getCumulativeDividendsForYear(year: string, inBaseCurrency = false): number {
    const amount = this.portfolio.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      return (
        accumulator +
        obj.dividends.getCumulativeDividendsAmountForYear(year, inBaseCurrency)
      );
    },
    0);
    return amount;
  }

  getCumulativePortfolioDividendsAmountForYear(
    year: string,
    inBaseCurrency = false
  ): number {
    const amount = this.portfolio.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      return (
        accumulator +
        obj.dividends.getCumulativeDividendsAmountForYear(year, inBaseCurrency)
      );
    },
    0);
    return amount;
  }

  getMonthlyDividendsForYear(year: string, inBaseCurrency = false): number {
    const amount = this.portfolio.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      return (
        accumulator +
        obj.dividends.getMonthlyDividendsForYear(year, inBaseCurrency)
      );
    },
    0);
    return amount;
  }
}
