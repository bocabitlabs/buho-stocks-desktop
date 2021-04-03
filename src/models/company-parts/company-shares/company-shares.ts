import moment from "moment";
import { ICompanyShares } from "types/company";
import { SharesTransaction } from "types/shares-transaction";
import { TransactionType } from "types/transaction";

export class CompanyShares implements ICompanyShares {
  sharesTransactions: SharesTransaction[];
  constructor(company: SharesTransaction[]) {
    this.sharesTransactions = company;
  }

  /**
   *
   * @returns
   */
  getSharesCount(): number {
    const buyCount = this.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          transaction.type === TransactionType.BUY
      )
      .reduce(function (accumulator: number, obj: SharesTransaction) {
        return accumulator + obj.count;
      }, 0);

    const sellCount = this.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          transaction.type === TransactionType.SELL
      )
      .reduce(function (accumulator: number, obj: SharesTransaction) {
        return accumulator + obj.count;
      }, 0);

    return buyCount - sellCount;
  }

  getSharesCountForYear(year: string): number {
    const buyCount = this.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          transaction.type === TransactionType.BUY &&
          moment(transaction.transactionDate).format("YYYY") === year
      )
      .reduce(function (accumulator: number, obj: SharesTransaction) {
        return accumulator + obj.count;
      }, 0);

    const sellCount = this.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          transaction.type === TransactionType.SELL &&
          moment(transaction.transactionDate).format("YYYY") === year
      )
      .reduce(function (accumulator: number, obj: SharesTransaction) {
        return accumulator + obj.count;
      }, 0);

    return buyCount - sellCount;
  }

  getCumulativeSharesCountUntilYear(year: string): number {
    const buyCount = this.sharesTransactions
      .filter((transaction: SharesTransaction) => {
        return (
          transaction.type === TransactionType.BUY &&
          moment(transaction.transactionDate, "YYYY-MM-DD").isBefore(
            moment(year + "-12-31", "YYYY-MM-DD")
          )
        );
      })
      .reduce(function (accumulator: number, obj: SharesTransaction) {
        return accumulator + obj.count;
      }, 0);

    const sellCount = this.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          transaction.type === TransactionType.SELL &&
          moment(transaction.transactionDate, "YYYY-MM-DD").isBefore(
            moment(year + "-12-31", "YYYY-MM-DD")
          )
      )
      .reduce(function (accumulator: number, obj: SharesTransaction) {
        return accumulator + obj.count;
      }, 0);

    return buyCount - sellCount;
  }
}
