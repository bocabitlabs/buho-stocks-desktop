import { ICompany } from "types/company";
import { IPortfolioValue } from "types/portfolio-parts/value-part/portfolio-value-part";

/**
 *
 */
export class PortfolioValue implements IPortfolioValue {
  companies: ICompany[];
  constructor(companies: ICompany[]) {
    this.companies = companies;
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
