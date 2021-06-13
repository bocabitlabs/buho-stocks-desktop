import { ICompany } from "types/company";
import { IPortfolioInvestments } from "types/portfolio-parts/investments-part/investment-part";


/**
 *
 */
export class PortfolioInvestment implements IPortfolioInvestments {
  companies: ICompany[];
  constructor(companies: ICompany[]) {
    this.companies = companies;
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