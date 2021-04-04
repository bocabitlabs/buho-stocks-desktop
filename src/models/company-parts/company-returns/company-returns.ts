import moment from "moment";
import { ICompany, ICompanyReturns } from "types/company";
import { SharesTransaction } from "types/shares-transaction";
import { TransactionType } from "types/transaction";

export class CompanyReturns implements ICompanyReturns{
  company: ICompany;
  constructor(company: ICompany){
    this.company = company;
  }

  getReturnFromSales(inPortfolioCurrency = false) {
    return this.company.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          transaction.type === TransactionType.SELL
      )
      .reduce(function (accumulator: number, obj: SharesTransaction) {
        if (inPortfolioCurrency) {
          return (
            accumulator +
            (obj.count * (obj.price * obj.exchangeRate) +
              obj.commission * obj.exchangeRate)
          );
        }
        return accumulator + (obj.count * obj.price + obj.commission);
      }, 0);
  }

  getReturnFromSalesForYear(
    year: string,
    inPortfolioCurrency = false
  ) {
    return this.company.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          moment(transaction.transactionDate).format("YYYY") === year
      )
      .filter(
        (transaction: SharesTransaction) =>
          transaction.type === TransactionType.SELL
      )
      .reduce(function (accumulator: number, obj: SharesTransaction) {
        if (inPortfolioCurrency) {
          return (
            accumulator +
            (obj.count * (obj.price * obj.exchangeRate) +
              obj.commission * obj.exchangeRate)
          );
        }
        return accumulator + (obj.count * obj.price + obj.commission);
      }, 0);
  }

  getReturn(inPortfolioCurrency = false) {
    const totalInvested = this.company.investment.getTotalInvested(inPortfolioCurrency);
    const portfolioValue = this.company.portfolioValue.getPortfolioValue(inPortfolioCurrency);
    let returnFromSales = this.getReturnFromSales(inPortfolioCurrency);
    let totalReturn = 0;
    if (this.company.closed) {
      totalReturn = returnFromSales - totalInvested;
    } else {
      totalReturn = portfolioValue - totalInvested;
    }
    return totalReturn;
  }

  /**
   * This one is OK
   * @param year
   * @param years
   * @param inPortfolioCurrency
   * @returns
   */
  getReturnForYear(
    year: string,
    inPortfolioCurrency = false
  ) {
    // R4-(R3+E4)
    // portfolioValue - (previousPortfolioValue + investedCurrentYear)
    const R3 = this.company.portfolioValue.getPortfolioValueForYear(
      (parseInt(year) - 1).toString(),
      inPortfolioCurrency
    );
    const R4 = this.company.portfolioValue.getPortfolioValueForYear(year, inPortfolioCurrency);
    const E4 = this.company.investment.getTotalInvestedOnYear(year, inPortfolioCurrency);
    let amount = R4 - (R3 + E4);

    return amount;
  }

  /**
   * This one is ok
   * @param inPortfolioCurrency
   * @returns
   */
  getReturnWithDividends(
    inPortfolioCurrency = false,
    includeCommission = true
  ): number {
    const totalReturn = this.getReturn(inPortfolioCurrency);
    const dividendsAmount = this.company.dividends.getDividendsAmount(
      inPortfolioCurrency,
      includeCommission
    );
    return totalReturn + dividendsAmount;
  }

  /**
   * Should be OK
   * @param year
   * @param years
   * @param inPortfolioCurrency
   * @returns
   */
  getReturnWithDividendsForYear(
    year: string,
    inPortfolioCurrency = false,
    includeCommission = true
  ): number {
    const totalReturn = this.getReturnForYear(year, inPortfolioCurrency);
    const dividendsAmount = this.company.dividends.getCumulativeDividendsAmountForYear(
      year,
      inPortfolioCurrency,
      includeCommission
    );
    return totalReturn + dividendsAmount;
  }

  getReturnPercentage(
    inPortfolioCurrency = false
  ): number {
    const totalReturn = this.getReturn(inPortfolioCurrency);
    const totalInvested = this.company.investment.getTotalInvested(inPortfolioCurrency);

    if (totalInvested === 0) {
      return 0;
    }

    const returnPercentage = (totalReturn / totalInvested) * 100;

    return returnPercentage;
  }

 getReturnPercentageForYear(
    year: string,
    inPortfolioCurrency = false
  ): number {
    const Q3 = this.company.portfolioValue.getPortfolioValueForYear(
      (parseInt(year) - 1).toString(),
      inPortfolioCurrency
    );
    const Q4 = this.company.portfolioValue.getPortfolioValueForYear(year, inPortfolioCurrency);
    const E4 = this.company.investment.getTotalInvestedOnYear(year, inPortfolioCurrency);
    let returnPercentage = 0;
    if (Q3 + E4 !== 0) {
      returnPercentage = (Q4 - (Q3 + E4)) / (Q3 + E4);
    }
    console.log(
      `${Q4} -(${Q3} + ${E4})/ ((${Q3} + ${E4})) = ${returnPercentage * 100}`
    );

    return returnPercentage * 100;
  }

  getReturnPercentageForYearWithDiviends(
    year: string,
    inPortfolioCurrency = false,
    includeCommission = true
  ): number {
    const Q3 = this.company.portfolioValue.getPortfolioValueForYear(
      (parseInt(year) - 1).toString(),
      inPortfolioCurrency
    );
    const Q4 = this.company.portfolioValue.getPortfolioValueForYear(year, inPortfolioCurrency);
    const E4 = this.company.investment.getTotalInvestedOnYear(year, inPortfolioCurrency);
    const F4 = this.company.dividends.getDividendsAmountForYear(
      year,
      inPortfolioCurrency,
      includeCommission
    );

    let returnPercentage = 0;
    if (Q3 + E4 !== 0) {
      returnPercentage = (Q4 + F4 - (Q3 + E4)) / (Q3 + E4);
    }
    console.log(
      `${Q4} -(${Q3} + ${E4})/ ((${Q3} + ${E4})) = ${returnPercentage * 100}`
    );

    return returnPercentage * 100;
  }

  getReturnWithDividendsPercentage(
    inPortfolioCurrency = false,
    includeCommission = true
  ): number {
    const totalReturn = this.getReturnWithDividends(
      inPortfolioCurrency,
      includeCommission
    );
    const totalInvested = this.company.investment.getTotalInvested(inPortfolioCurrency);

    if (totalInvested === 0) {
      return 0;
    }

    const returnPercentage = (totalReturn / totalInvested) * 100;

    return returnPercentage;
  }

  /**
   * This one is OK
   * @param year
   * @param years
   * @param inPortfolioCurrency
   * @returns
   */
  getReturnPercentageCumulativeForYear(
    year: string,
    inPortfolioCurrency = false
  ): number {
    const Q4 = this.company.portfolioValue.getPortfolioValueForYear(year, inPortfolioCurrency);
    const F4 = this.company.investment.getTotalInvestedUntilYear(year, inPortfolioCurrency);
    console.debug(`Amount invested in ${year}: ${F4} -> ${Q4}`);

    let amount = 0;
    if (F4 > 0) {
      amount = (Q4 - F4) / F4;
    }

    return amount * 100;
  }

  /**
   * This one is OK
   * @param year
   * @param years
   * @param inPortfolioCurrency
   * @returns
   */
  getReturnPercentageCumulativeWithDividendsForYear(
    year: string,
    inPortfolioCurrency = false
  ): number {
    const Q4 = this.company.portfolioValue.getPortfolioValueForYear(year, inPortfolioCurrency);
    const D1 = this.company.dividends.getCumulativeDividendsAmountForYear(
      year,
      inPortfolioCurrency
    );

    const F4 = this.company.investment.getTotalInvestedUntilYear(year, inPortfolioCurrency);
    let amount = 0;
    if (F4 > 0) {
      amount = (Q4 + D1 - F4) / F4;
    }

    return amount * 100;
  }
}