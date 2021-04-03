import { ICompany } from "types/company";
import { IPortfolio, IPortfolioReturns } from "types/portfolio";

export class PortfolioReturns implements IPortfolioReturns {
  portfolio: IPortfolio;
  constructor(portfolio: IPortfolio) {
    this.portfolio = portfolio;
  }
  getReturnFromSalesForYear(year: string, inBaseCurrency: boolean) {
    const totalInvested = this.portfolio.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      if (inBaseCurrency) {
        return (
          accumulator +
          obj.returns.getReturnFromSalesForYear(year, inBaseCurrency)
        );
      }
      return (
        accumulator +
        obj.returns.getReturnFromSalesForYear(year, inBaseCurrency)
      );
    },
    0);
    return totalInvested;
  }

  private getReturnFromSales = (inBaseCurrency = false) => {
    const totalInvested = this.portfolio.companies.reduce(function (
      accumulator: number,
      obj: ICompany
    ) {
      if (inBaseCurrency) {
        return accumulator + obj.returns.getReturnFromSales(inBaseCurrency);
      }
      return accumulator + obj.returns.getReturnFromSales(inBaseCurrency);
    },
    0);
    return totalInvested;
  };

  getReturn(inBaseCurrency = false): number {
    const totalInvested = this.portfolio.investments.getTotalInvested(
      inBaseCurrency
    );
    const portfolioValue = this.portfolio.getPortfolioValue(inBaseCurrency);
    let returnFromSales = this.getReturnFromSales(inBaseCurrency);
    let totalReturn = 0;

    totalReturn = portfolioValue + returnFromSales - totalInvested;

    return totalReturn;
  }

  getReturnForYear(year: string, inBaseCurrency = false): number {
    let totalReturn = 0;

    const totalInvested = this.portfolio.investments.getTotalInvestedUntilYear(
      year,
      inBaseCurrency
    );
    const portfolioValue = this.portfolio.getPortfolioValueForYear(
      year,
      inBaseCurrency
    );
    let returnFromSales = this.getReturnFromSalesForYear(year, inBaseCurrency);
    totalReturn = portfolioValue + returnFromSales - totalInvested;
    console.debug(
      `Total return for ${year}: totalInvested= ${totalInvested} portfolioValue=${portfolioValue}. Result: ${totalReturn}`
    );

    return totalReturn;
  }

  getReturnPercentageForYear(year: string, inBaseCurrency = false): number {
    console.debug(`getReturnPercentageForYear`);
    const J2 = this.portfolio.getPortfolioValueForYear(
      (parseInt(year) - 1).toString(),
      inBaseCurrency
    );
    const J3 = this.portfolio.getPortfolioValueForYear(year, inBaseCurrency);
    const B3 = this.portfolio.investments.getTotalInvestedOnYear(
      year,
      inBaseCurrency
    );
    let amount = 0;
    if (J2 + B3 > 0) {
      amount = (J3 - (J2 + B3)) / (J2 + B3);
    }
    //=SI(J2+B3>0,(J3-(J2+B3))/(J2+B3),0)

    return amount * 100;
  }

  getReturnPercentageCumulativeForYear(
    year: string,
    inBaseCurrency = false
  ): number {
    const J3 = this.portfolio.getPortfolioValueForYear(year, inBaseCurrency);
    const E3 = this.portfolio.investments.getTotalInvestedUntilYear(
      year,
      inBaseCurrency
    );
    let amount = 0;
    if (E3 > 0) {
      amount = (J3 - E3) / E3;
    }
    //=SI(E3>0,(J3-E3)/E3,0)

    return amount * 100;
  }

  getReturnPercentageWithDividendsForYearCumulative(
    year: string,
    inBaseCurrency = false
  ): number {
    const J3 = this.portfolio.getPortfolioValueForYear(year, inBaseCurrency);
    const E3 = this.portfolio.investments.getTotalInvestedUntilYear(
      year,
      inBaseCurrency
    );
    const dividendsAmount = this.portfolio.dividends.getCumulativePortfolioDividendsAmountForYear(
      year,
      inBaseCurrency
    );

    let amount = 0;
    if (E3 > 0) {
      amount = (J3 + dividendsAmount - E3) / E3;
    }
    //=SI(E3>0,(J3-E3)/E3,0)
    console.info(`${year}: ${J3} + ${dividendsAmount} - ${E3}/${E3}`);

    return amount * 100;
  }

  getReturnWithDividends(inBaseCurrency = false): number {
    const totalReturn = this.getReturn(inBaseCurrency);
    const dividendsAmount = this.portfolio.dividends.getDividends(
      inBaseCurrency
    );
    return totalReturn + dividendsAmount;
  }

  getReturnWithDividendsForYear(year: string, inBaseCurrency = false): number {
    const totalReturn = this.getReturnForYear(year, inBaseCurrency);
    const dividendsAmount = this.portfolio.dividends.getCumulativePortfolioDividendsAmountForYear(
      year,
      inBaseCurrency
    );
    const totalAmount = totalReturn + dividendsAmount;
    console.debug(
      `${year}: Total: ${totalAmount} (${totalReturn} + ${dividendsAmount})`
    );

    return totalAmount;
  }

  getReturnPercentage(inBaseCurrency = false): number {
    const totalReturn = this.getReturn(inBaseCurrency);
    const totalInvested = this.portfolio.investments.getTotalInvested(
      inBaseCurrency
    );

    if (totalInvested === 0) {
      return 0;
    }

    const returnPercentage = (totalReturn / totalInvested) * 100;

    return returnPercentage;
  }

  getReturnWithDividendsPercentage(inBaseCurrency = false): number {
    const totalReturn = this.getReturnWithDividends(inBaseCurrency);
    const totalInvested = this.portfolio.investments.getTotalInvested(
      inBaseCurrency
    );

    if (totalInvested === 0) {
      return 0;
    }

    const returnPercentage = (totalReturn / totalInvested) * 100;

    return returnPercentage;
  }
}
