import moment from "moment";
import { ICompany, ICompanyShares } from "types/company";
import { SharesTransaction } from "types/shares-transaction";
import { TransactionType } from "types/transaction";

export class CompanyShares implements ICompanyShares {
  company: ICompany;
  constructor(company: ICompany) {
    this.company = company;
  }

  getSharesCount(): number {
    const buyCount = this.company.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          transaction.type === TransactionType.BUY
      )
      .reduce(function (accumulator: number, obj: SharesTransaction) {
        return accumulator + obj.count;
      }, 0);

    const sellCount = this.company.sharesTransactions
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
    const buyCount = this.company.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          transaction.type === TransactionType.BUY &&
          moment(transaction.transactionDate).format("YYYY") === year
      )
      .reduce(function (accumulator: number, obj: SharesTransaction) {
        return accumulator + obj.count;
      }, 0);

    const sellCount = this.company.sharesTransactions
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
    const buyCount = this.company.sharesTransactions
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

    const sellCount = this.company.sharesTransactions
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

    // console.debug(
    //   `getAccumulatedSharesCountForYear ${year}: Return ${buyCount - sellCount}`
    // );
    return buyCount - sellCount;
  }
}
