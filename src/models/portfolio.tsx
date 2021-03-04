import { ICompany } from "types/company";
import { IPortfolio } from "types/portfolio";

export class Portfolio implements IPortfolio {
  id: string;
  currencySymbol: string;
  currencyName: string;
  currencyAbbreviation: string;
  name: string;
  description: string;
  color: string;
  currencyId: number;
  companies: ICompany[];

  constructor(parameters: IPortfolio) {
    this.id = parameters.id;
    this.currencySymbol = parameters.currencySymbol;
    this.currencyName = parameters.currencyName;
    this.currencyAbbreviation = parameters.currencyAbbreviation;
    this.name = parameters.name;
    this.description = parameters.description;
    this.color = parameters.color;
    this.currencyId = parameters.currencyId;
    this.companies = parameters.companies;
  }

  getPortfolioValue(inBaseCurrency = false): number {
    const totalPortfolioValue = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      if (inBaseCurrency) {
        return accumulator + obj.getPortfolioValue(true);
      }
      return accumulator + obj.getPortfolioValue();
    },
    0);
    return totalPortfolioValue;
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

  getAllPortfolioDividends(inBaseCurrency = false): number {
    const amount = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      if (inBaseCurrency) {
        return accumulator + obj.getDividendsAmount(inBaseCurrency);
      }
      return accumulator + obj.getDividendsAmount(inBaseCurrency);
    },
    0);
    return amount;
  }

  getPortfolioDividends(year: string, inBaseCurrency = false): number {
    const amount = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      if (inBaseCurrency) {
        return accumulator + obj.getDividendsForYear(year, true);
      }
      return accumulator + obj.getDividendsForYear(year);
    },
    0);
    return amount;
  }

  getMonthlyDividendsForYear(year: string, inBaseCurrency = false): number {
    const amount = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      if (inBaseCurrency) {
        return accumulator + obj.getMonthlyDividendsForYear(year, true);
      }
      return accumulator + obj.getMonthlyDividendsForYear(year);
    },
    0);
    return amount;
  }

  getTotalInvested(inBaseCurrency: boolean) {
    const totalInvested = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      if (inBaseCurrency) {
        return accumulator + obj.getTotalInvested(inBaseCurrency);
      }
      return accumulator + obj.getTotalInvested(inBaseCurrency);
    },
    0);
    return totalInvested;
  }

  private getReturnFromSales = (inBaseCurrency = false) => {
    const totalInvested = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      if (inBaseCurrency) {
        return accumulator + obj.getReturnFromSales(inBaseCurrency);
      }
      return accumulator + obj.getReturnFromSales(inBaseCurrency);
    },
    0);
    return totalInvested;
  };

  getReturn(inBaseCurrency = false): number {
    const totalInvested = this.getTotalInvested(inBaseCurrency);
    const portfolioValue = this.getPortfolioValue(inBaseCurrency);
    let returnFromSales = this.getReturnFromSales(inBaseCurrency);
    let totalReturn = 0;

    totalReturn = portfolioValue + returnFromSales - totalInvested;

    return totalReturn;
  }

  getReturnWithDividends(inBaseCurrency = false): number {
    const totalReturn = this.getReturn(inBaseCurrency);
    const dividendsAmount = this.getAllPortfolioDividends(inBaseCurrency);
    return totalReturn + dividendsAmount;
  }

  getReturnPercentage(inBaseCurrency = false): number {
    const totalReturn = this.getReturn(inBaseCurrency);
    const totalInvested = this.getTotalInvested(inBaseCurrency);

    if (totalInvested === 0) {
      return 0;
    }

    const returnPercentage = (totalReturn / totalInvested) * 100;

    return returnPercentage;
  }

  getReturnWithDividendsPercentage(inBaseCurrency = false): number {
    const totalReturn = this.getReturnWithDividends(inBaseCurrency);
    const totalInvested = this.getTotalInvested(inBaseCurrency);

    if (totalInvested === 0) {
      return 0;
    }

    const returnPercentage = (totalReturn / totalInvested) * 100;

    return returnPercentage;
  }
}
