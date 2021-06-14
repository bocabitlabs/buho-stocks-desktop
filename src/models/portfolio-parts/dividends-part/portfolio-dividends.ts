import { ICompany } from "types/company";
import { IPortfolioDividends } from "types/portfolio-parts/dividends-part/dividends-part";

export class PortfolioDividends implements IPortfolioDividends {
  companies: ICompany[];
  constructor(companies: ICompany[]) {
    this.companies = companies;
  }
  getDividends(inBaseCurrency = false): number {
    const amount = this.companies.reduce(function (
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
    const amount = this.companies.reduce(function (
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
    const amount = this.companies.reduce(function (
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
    const amount = this.companies.reduce(function (
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
