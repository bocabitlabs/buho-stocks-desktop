import moment from "moment";
import { IDividendsTransaction } from "types/dividends-transaction";

import { ICompanyDividends } from "types/company";

export class CompanyDividends implements ICompanyDividends {
  dividendsTransactions: IDividendsTransaction[];
  constructor(dividendsTransactions: IDividendsTransaction[]) {
    this.dividendsTransactions = dividendsTransactions;
  }
  getDividendsAmount(
    inPortfolioCurrency = false,
    includeCommission = true
  ): number {
    const amount = this.dividendsTransactions.reduce(function (
      accumulator: number,
      obj: IDividendsTransaction
    ) {
      let exchangeRate = 1;
      if (inPortfolioCurrency) {
        exchangeRate = obj.exchangeRate;
      }
      if (includeCommission) {
        return (
          accumulator + (obj.price * obj.count - obj.commission) * exchangeRate
        );
      }

      return accumulator + obj.price * exchangeRate * obj.count;
    },
    0);
    return amount;
  }

  getDividendsAmountForYear(
    year: string,
    inPortfolioCurrency?: boolean,
    includeCommission = true
  ): number {
    const amount = this.dividendsTransactions
      .filter(
        (transaction: IDividendsTransaction) =>
          moment(transaction.transactionDate).format("YYYY") === year
      )
      .reduce(function (accumulator: number, obj: IDividendsTransaction) {
        let exchangeRate = 1;
        if (inPortfolioCurrency) {
          exchangeRate = obj.exchangeRate;
        }
        if (includeCommission) {
          return (
            accumulator +
            (obj.price * exchangeRate * obj.count - obj.commission)
          );
        }
        return accumulator + obj.price * exchangeRate * obj.count;
      }, 0);
    return amount;
  }

  getCumulativeDividendsAmountForYear(
    year: string,
    inPortfolioCurrency?: boolean,
    includeCommission = true
  ): number {
    const amount = this.dividendsTransactions
      .filter((transaction: IDividendsTransaction) => {
        return moment(transaction.transactionDate, "YYYY-MM-DD").isBefore(
          moment(year + "-12-31", "YYYY-MM-DD")
        );
      })
      .reduce(function (accumulator: number, obj: IDividendsTransaction) {
        let exchangeRate = 1;
        if (inPortfolioCurrency) {
          exchangeRate = obj.exchangeRate;
        }
        if (includeCommission) {
          return (
            accumulator +
            (obj.price * exchangeRate * obj.count - obj.commission)
          );
        }
        return accumulator + obj.price * exchangeRate * obj.count;
      }, 0);
    return amount;
  }

  getMonthlyDividendsForYear(
    year: string,
    inPortfolioCurrency?: boolean
  ): number {
    return this.getDividendsAmountForYear(year, inPortfolioCurrency) / 12;
  }
}
