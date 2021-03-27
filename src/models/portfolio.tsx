import { ICompany } from "types/company";
import { IPortfolio } from "types/portfolio";

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
  }

  getPortfolioValue(inBaseCurrency = false): number {
    const totalPortfolioValue = this.companies
      .filter((company) => !company.closed)
      .reduce(function (accumulator: number, obj: ICompany) {
        return accumulator + obj.getPortfolioValue(inBaseCurrency);
      }, 0);
    return totalPortfolioValue;
  }

  getPortfolioValueForYear(
    year: string,
    years: number[],
    inBaseCurrency = false
  ): number {
    console.debug(`Portfolio value: for year ${year}`)
    let accumulated = this.companies
      .filter((company) => !company.closed)
      .reduce(function (accumulator: number, obj: ICompany) {
        return (
          accumulator +
          obj.getPortfolioValueForYear(year, inBaseCurrency)
        );
      }, 0);
    console.debug(`Portfolio value: for year ${year} = ${accumulated}`)

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

  getDividends(inBaseCurrency = false): number {
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

  getDividendsForYear(year: string, inBaseCurrency = false): number {
    const amount = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      return accumulator + obj.getDividendsAmountForYear(year, inBaseCurrency);
    },
    0);
    return amount;
  }

  getCumulativeDividendsForYear(year: string, inBaseCurrency = false): number {
    const amount = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      return accumulator + obj.getCumulativeDividendsAmountForYear(year, inBaseCurrency);
    },
    0);
    return amount;
  }

  getCumulativePortfolioDividendsAmountForYear(year: string, inBaseCurrency = false): number {
    const amount = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      return accumulator + obj.getCumulativeDividendsAmountForYear(year, inBaseCurrency);
    },
    0);
    return amount;
  }

  getMonthlyDividendsForYear(year: string, inBaseCurrency = false): number {
    const amount = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      return accumulator + obj.getMonthlyDividendsForYear(year, inBaseCurrency);
    },
    0);
    return amount;
  }

  getTotalInvested(inBaseCurrency: boolean) {
    const totalInvested = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      return accumulator + obj.getTotalInvested(inBaseCurrency);
    },
    0);
    return totalInvested;
  }

  getTotalInvestedOnYear(year: string, inBaseCurrency: boolean) {
    const totalInvested = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      return accumulator + obj.getTotalInvestedOnYear(year, inBaseCurrency);
    },
    0);
    return totalInvested;
  }

  getTotalInvestedUntilYear(year: string, inBaseCurrency = false): number {
    const totalInvested = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      return accumulator + obj.getTotalInvestedUntilYear(year, inBaseCurrency);
    },
    0);
    return totalInvested;
  }

  getReturnFromSalesForYear(year: string, inBaseCurrency: boolean) {
    const totalInvested = this.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      if (inBaseCurrency) {
        return (
          accumulator + obj.getReturnFromSalesForYear(year, inBaseCurrency)
        );
      }
      return accumulator + obj.getReturnFromSalesForYear(year, inBaseCurrency);
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



  getReturnForYear(
    year: string,
    years: number[],
    inBaseCurrency = false
  ): number {
    let totalReturn = 0;

    const totalInvested = this.getTotalInvestedUntilYear(year, inBaseCurrency);
    const portfolioValue = this.getPortfolioValueForYear(
      year,
      years,
      inBaseCurrency
    );
    let returnFromSales = this.getReturnFromSalesForYear(year, inBaseCurrency);
    totalReturn = portfolioValue + returnFromSales - totalInvested;
    console.debug(`Total return for ${year}: totalInvested= ${totalInvested} portfolioValue=${portfolioValue}. Result: ${totalReturn}`);

    return totalReturn;
  }

  getReturnPercentageForYear(
    year: string,
    years: number[],
    inBaseCurrency = false
  ): number {
    console.debug(`getReturnPercentageForYear`);
    const J2 = this.getPortfolioValueForYear(
      (parseInt(year) - 1).toString(),
      years,
      inBaseCurrency
    );
    const J3 = this.getPortfolioValueForYear(year, years, inBaseCurrency);
    const B3 = this.getTotalInvestedOnYear(year, inBaseCurrency);
    let amount = 0;
    if (J2 + B3 > 0) {
      amount = (J3 - (J2 + B3)) / (J2 + B3);
    }
    //=SI(J2+B3>0,(J3-(J2+B3))/(J2+B3),0)

    return amount * 100;
  }

  getReturnPercentageCumulativeForYear(
    year: string,
    years: number[],
    inBaseCurrency = false
  ): number {
    const J3 = this.getPortfolioValueForYear(year, years, inBaseCurrency);
    const E3 = this.getTotalInvestedUntilYear(year, inBaseCurrency);
    let amount = 0;
    if (E3 > 0) {
      amount = (J3-E3)/E3;
    }
    //=SI(E3>0,(J3-E3)/E3,0)

    return amount * 100;
  }

  getReturnWithDividends(inBaseCurrency = false): number {
    const totalReturn = this.getReturn(inBaseCurrency);
    const dividendsAmount = this.getDividends(inBaseCurrency);
    return totalReturn + dividendsAmount;
  }

  getReturnWithDividendsForYear(
    year: string,
    years: number[],
    inBaseCurrency = false
  ): number {
    const totalReturn = this.getReturnForYear(year, years, inBaseCurrency);
    const dividendsAmount = this.getCumulativePortfolioDividendsAmountForYear(year, inBaseCurrency);
    const totalAmount = totalReturn + dividendsAmount;
    console.debug(
      `${year}: Total: ${totalAmount} (${totalReturn} + ${dividendsAmount})`
    );

    return totalAmount;
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
