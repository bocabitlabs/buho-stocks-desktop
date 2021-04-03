import moment from "moment";
import { DividendsTransaction } from "types/dividends-transaction";

import { ICompany, ICompanyDividends } from "types/company";

export class CompanyDividends implements ICompanyDividends {
  company: ICompany;
  constructor(company: ICompany) {
    this.company = company;
  }
  getDividendsAmount(
    inPortfolioCurrency = false,
    includeCommission = true
  ): number {
    const amount = this.company.dividendsTransactions.reduce(function (
      accumulator: number,
      obj: DividendsTransaction
    ) {
      let exchangeRate = 1;
      if (inPortfolioCurrency) {
        exchangeRate = obj.exchangeRate;
      }
      console.debug(
        `Get dividends amount with commission: ${includeCommission}`
      );
      if (includeCommission) {
        return (
          accumulator + (obj.price * exchangeRate * obj.count - obj.commission)
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
    const amount = this.company.dividendsTransactions
      .filter(
        (transaction: DividendsTransaction) =>
          moment(transaction.transactionDate).format("YYYY") === year
      )
      .reduce(function (accumulator: number, obj: DividendsTransaction) {
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
    const amount = this.company.dividendsTransactions
      .filter((transaction: DividendsTransaction) => {
        return moment(transaction.transactionDate, "YYYY-MM-DD").isBefore(
          moment(year + "-12-31", "YYYY-MM-DD")
        );
      })
      .reduce(function (accumulator: number, obj: DividendsTransaction) {
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
