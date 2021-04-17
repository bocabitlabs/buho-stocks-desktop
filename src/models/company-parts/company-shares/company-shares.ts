import moment from "moment";
import { ICompanyShares } from "types/company";
import { ISharesTransaction } from "types/shares-transaction";
import { TransactionType } from "types/transaction";

export class CompanyShares implements ICompanyShares {
  sharesTransactions: ISharesTransaction[];
  constructor(company: ISharesTransaction[]) {
    this.sharesTransactions = company;
  }

  /**
   *
   * @returns
   */
  getSharesCount(): number {
    const buyCount = this.sharesTransactions
      .filter(
        (transaction: ISharesTransaction) =>
          transaction.type === "BUY"
      )
      .reduce(function (accumulator: number, obj: ISharesTransaction) {
        return accumulator + obj.count;
      }, 0);

    const sellCount = this.sharesTransactions
      .filter(
        (transaction: ISharesTransaction) =>
          transaction.type === "SELL"
      )
      .reduce(function (accumulator: number, obj: ISharesTransaction) {
        return accumulator + obj.count;
      }, 0);

    return buyCount - sellCount;
  }

  getSharesCountForYear(year: string): number {
    const buyCount = this.sharesTransactions
      .filter(
        (transaction: ISharesTransaction) =>
          transaction.type === "BUY" &&
          moment(transaction.transactionDate).format("YYYY") === year
      )
      .reduce(function (accumulator: number, obj: ISharesTransaction) {
        return accumulator + obj.count;
      }, 0);

    const sellCount = this.sharesTransactions
      .filter(
        (transaction: ISharesTransaction) =>
          transaction.type === "SELL" &&
          moment(transaction.transactionDate).format("YYYY") === year
      )
      .reduce(function (accumulator: number, obj: ISharesTransaction) {
        return accumulator + obj.count;
      }, 0);

    return buyCount - sellCount;
  }

  getCumulativeSharesCountUntilYear(year: string): number {
    const buyCount = this.sharesTransactions
      .filter((transaction: ISharesTransaction) => {
        return (
          transaction.type === "BUY" &&
          moment(transaction.transactionDate, "YYYY-MM-DD").isBefore(
            moment(year + "-12-31", "YYYY-MM-DD")
          )
        );
      })
      .reduce(function (accumulator: number, obj: ISharesTransaction) {
        return accumulator + obj.count;
      }, 0);

    const sellCount = this.sharesTransactions
      .filter(
        (transaction: ISharesTransaction) =>
          transaction.type === "SELL" &&
          moment(transaction.transactionDate, "YYYY-MM-DD").isBefore(
            moment(year + "-12-31", "YYYY-MM-DD")
          )
      )
      .reduce(function (accumulator: number, obj: ISharesTransaction) {
        return accumulator + obj.count;
      }, 0);

    return buyCount - sellCount;
  }
}
