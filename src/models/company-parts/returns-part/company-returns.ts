import moment from "moment";
import { ICompanyDividends } from "types/company-parts/dividends-part/dividends-part";
import { ICompanyInvestment } from "types/company-parts/investment-part/investment-part";
import { ICompanyPortfolioValue } from "types/company-parts/portfolio-value/portfolio-value-part";
import { ICompanyReturns } from "types/company-parts/returns-part/returns-part";

import { IDividendsTransaction } from "types/dividends-transaction";
import { IRightsTransaction } from "types/rights-transaction";
import { ISharesTransaction } from "types/shares-transaction";
import { IStockPrice } from "types/stock-price";
import { CompanyDividends } from "../dividends-part/company-dividends";
import { CompanyInvestment } from "../investment-part/company-investment";
import { CompanyPortfolioValue } from "../portfolio-value-part/company-portfolio-value";


export class CompanyReturns implements ICompanyReturns {
  rightsTransactions: IRightsTransaction[];
  sharesTransactions: ISharesTransaction[];
  dividendsTransactions: IDividendsTransaction[];
  investment: ICompanyInvestment;
  dividends: ICompanyDividends;
  portfolioValue: ICompanyPortfolioValue;
  closed: boolean;

  constructor(
    closed: boolean,
    companyName: string,
    dividendsTransactions: IDividendsTransaction[],
    rightsTransactions: IRightsTransaction[],
    sharesTransactions: ISharesTransaction[],
    stockPrices: IStockPrice[],
  ) {
    this.closed = closed;
    this.rightsTransactions = rightsTransactions;
    this.sharesTransactions = sharesTransactions;
    this.dividendsTransactions = dividendsTransactions;
    this.investment = new CompanyInvestment(
      this.sharesTransactions,
      this.rightsTransactions
    );
    this.dividends = new CompanyDividends(dividendsTransactions);
    this.portfolioValue = new CompanyPortfolioValue(
      companyName,
      stockPrices,
      sharesTransactions
    );
  }

  getReturnFromSales(inPortfolioCurrency = false) {
    return this.sharesTransactions
      .filter(
        (transaction: ISharesTransaction) =>
          transaction.type === "SELL"
      )
      .reduce(function (accumulator: number, obj: ISharesTransaction) {
        let exchangeRate = 1;
        if (inPortfolioCurrency) {
          exchangeRate = obj.exchangeRate;
        }
        console.debug(
          `${accumulator} + ${obj.count} * ${obj.price} * ${exchangeRate} - (${obj.commission} * ${exchangeRate})`
        );
        return (
          accumulator +
          (obj.count * (obj.price * exchangeRate) -
            obj.commission * exchangeRate)
        );
      }, 0);
  }

  getReturnFromSalesForYear(year: string, inPortfolioCurrency = false) {
    return this.sharesTransactions
      .filter(
        (transaction: ISharesTransaction) =>
          moment(transaction.transactionDate).format("YYYY") === year
      )
      .filter(
        (transaction: ISharesTransaction) =>
          transaction.type === "SELL"
      )
      .reduce(function (accumulator: number, obj: ISharesTransaction) {
        let exchangeRate = 1;
        if (inPortfolioCurrency) {
          exchangeRate = obj.exchangeRate;
        }
        return (
          accumulator +
          (obj.count * (obj.price * exchangeRate) -
            obj.commission * exchangeRate)
        );
      }, 0);
  }

  getReturn(inPortfolioCurrency = false) {
    const totalInvested = this.investment.getTotalInvested(inPortfolioCurrency);
    const portfolioValue = this.portfolioValue.getPortfolioValue(
      inPortfolioCurrency
    );
    let totalReturn = 0;
    if (this.closed) {
      let returnFromSales = this.getReturnFromSales(inPortfolioCurrency);
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
  getReturnForYear(year: string, inPortfolioCurrency = false) {
    // R4-(R3+E4)
    // portfolioValue - (previousPortfolioValue + investedCurrentYear)
    const portfolioValuePreviousYear = this.portfolioValue.getPortfolioValueForYear(
      (parseInt(year) - 1).toString(),
      inPortfolioCurrency
    );
    const portfolioValueCurrentYear = this.portfolioValue.getPortfolioValueForYear(
      year,
      inPortfolioCurrency
    );
    const totalInvestedOnCurrentYear = this.investment.getTotalInvestedOnYear(
      year,
      inPortfolioCurrency
    );
    let amount =
      portfolioValueCurrentYear -
      (portfolioValuePreviousYear + totalInvestedOnCurrentYear);
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
    const dividendsAmount = this.dividends.getDividendsAmount(
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
    const dividendsAmount = this.dividends.getCumulativeDividendsAmountForYear(
      year,
      inPortfolioCurrency,
      includeCommission
    );
    return totalReturn + dividendsAmount;
  }

  getReturnPercentage(inPortfolioCurrency = false): number {
    const totalReturn = this.getReturn(inPortfolioCurrency);
    const totalInvested = this.investment.getTotalInvested(inPortfolioCurrency);

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
    const Q3 = this.portfolioValue.getPortfolioValueForYear(
      (parseInt(year) - 1).toString(),
      inPortfolioCurrency
    );
    const Q4 = this.portfolioValue.getPortfolioValueForYear(
      year,
      inPortfolioCurrency
    );
    const E4 = this.investment.getTotalInvestedOnYear(
      year,
      inPortfolioCurrency
    );
    let returnPercentage = 0;
    if (Q3 + E4 !== 0) {
      returnPercentage = (Q4 - (Q3 + E4)) / (Q3 + E4);
    }

    return returnPercentage * 100;
  }

  getReturnPercentageForYearWithDiviends(
    year: string,
    inPortfolioCurrency = false,
    includeCommission = true
  ): number {
    const Q3 = this.portfolioValue.getPortfolioValueForYear(
      (parseInt(year) - 1).toString(),
      inPortfolioCurrency
    );
    const Q4 = this.portfolioValue.getPortfolioValueForYear(
      year,
      inPortfolioCurrency
    );
    const E4 = this.investment.getTotalInvestedOnYear(
      year,
      inPortfolioCurrency
    );
    const F4 = this.dividends.getDividendsAmountForYear(
      year,
      inPortfolioCurrency,
      includeCommission
    );

    let returnPercentage = 0;
    if (Q3 + E4 !== 0) {
      returnPercentage = (Q4 + F4 - (Q3 + E4)) / (Q3 + E4);
    }

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
    const totalInvested = this.investment.getTotalInvested(inPortfolioCurrency);

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
    const Q4 = this.portfolioValue.getPortfolioValueForYear(
      year,
      inPortfolioCurrency
    );
    const F4 = this.investment.getTotalInvestedUntilYear(
      year,
      inPortfolioCurrency
    );
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
    const Q4 = this.portfolioValue.getPortfolioValueForYear(
      year,
      inPortfolioCurrency
    );
    const D1 = this.dividends.getCumulativeDividendsAmountForYear(
      year,
      inPortfolioCurrency
    );

    const F4 = this.investment.getTotalInvestedUntilYear(
      year,
      inPortfolioCurrency
    );
    let amount = 0;
    if (F4 > 0) {
      amount = (Q4 + D1 - F4) / F4;
    }

    return amount * 100;
  }
}
