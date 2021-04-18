import moment from "moment";
import { ICompanyInvestment } from "types/company-parts/investment-part/investment-part";

import { IRightsTransaction } from "types/rights-transaction";
import { ISharesTransaction } from "types/shares-transaction";

export class CompanyInvestment implements ICompanyInvestment {
  sharesTransactions: ISharesTransaction[];
  rightsTransactions: IRightsTransaction[];

  constructor(
    sharesTransactions: ISharesTransaction[],
    rightsTransactions: IRightsTransaction[]
  ) {
    this.sharesTransactions = sharesTransactions;
    this.rightsTransactions = rightsTransactions;
  }

  getTotalInvested(inPortfolioCurrency = false): number {
    // yearlyShares.investedAmount + yearlyShares.investmentCommission;
    const investedInShares = this.getInvestedInShares(inPortfolioCurrency);
    const investedInRights = this.getInvestedInRights(inPortfolioCurrency);
    return investedInShares + investedInRights;
  }

  getTotalInvestedUntilYear(year: string, inPortfolioCurrency = false): number {
    // yearlyShares.investedAmount + yearlyShares.investmentCommission;
    const investedInShares = this.getInvestedInSharesUntilYear(
      year,
      inPortfolioCurrency
    );
    const investedInRights = this.getInvestedInRightsUntilYear(
      year,
      inPortfolioCurrency
    );
    return investedInShares + investedInRights;
  }

  getTotalInvestedOnYear(year: string, inPortfolioCurrency = false): number {
    // yearlyShares.investedAmount + yearlyShares.investmentCommission;
    const investedInShares = this.getInvestedInSharesOnYear(
      year,
      inPortfolioCurrency
    );
    const investedInRights = this.getInvestedInRightsForYear(
      year,
      inPortfolioCurrency
    );
    const amount = investedInShares + investedInRights;

    return amount;
  }

  private getInvestedInShares(inPortfolioCurrency: boolean) {
    return this.sharesTransactions
      .filter(
        (transaction: ISharesTransaction) =>
          transaction.type === "BUY"
      )
      .reduce(function (accumulator: number, obj: ISharesTransaction) {
        let exchangeRate = 1;
        if (inPortfolioCurrency) {
          exchangeRate = obj.exchangeRate;
        }
        return (
          accumulator +
          (obj.count * (obj.price * exchangeRate) +
            obj.commission * exchangeRate)
        );
      }, 0);
  }

  private getInvestedInSharesOnYear(
    year: string,
    inPortfolioCurrency: boolean
  ) {
    const amount = this.sharesTransactions
      .filter(
        (transaction: ISharesTransaction) =>
          moment(transaction.transactionDate).format("YYYY") === year
      )
      .filter(
        (transaction: ISharesTransaction) =>
          transaction.type === "BUY"
      )
      .reduce(function (accumulator: number, obj: ISharesTransaction) {
        if (inPortfolioCurrency) {
          return (
            accumulator +
            (obj.count * (obj.price * obj.exchangeRate) +
              obj.commission * obj.exchangeRate)
          );
        }
        return accumulator + (obj.count * obj.price + obj.commission);
      }, 0);
    return amount;
  }

  private getInvestedInRights(inPortfolioCurrency: boolean) {
    return this.rightsTransactions
      .filter(
        (transaction: IRightsTransaction) =>
          transaction.type === "BUY"
      )
      .reduce(function (accumulator: number, obj: IRightsTransaction) {
        let exchangeRate = 1;
        if (inPortfolioCurrency) {
          exchangeRate = obj.exchangeRate;
        }
        return (
          accumulator +
          (obj.count * (obj.price * exchangeRate) +
            obj.commission * exchangeRate)
        );
      }, 0);
  }

  private getInvestedInSharesUntilYear(
    year: string,
    inPortfolioCurrency: boolean
  ) {
    return this.sharesTransactions
      .filter(
        (transaction: ISharesTransaction) =>
          transaction.type === "BUY" &&
          moment(transaction.transactionDate, "YYYY-MM-DD").isBefore(
            moment(year + "-12-31", "YYYY-MM-DD")
          )
      )
      .reduce(function (accumulator: number, obj: ISharesTransaction) {
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

  private getInvestedInRightsUntilYear(
    year: string,
    inPortfolioCurrency: boolean
  ) {
    return this.rightsTransactions
      .filter((transaction: IRightsTransaction) =>
        moment(transaction.transactionDate, "YYYY-MM-DD").isBefore(
          moment(year + "-12-31", "YYYY-MM-DD")
        )
      )
      .reduce(function (accumulator: number, obj: IRightsTransaction) {
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

  private getInvestedInRightsForYear(
    year: string,
    inPortfolioCurrency: boolean
  ) {
    return this.rightsTransactions
      .filter(
        (transaction: IRightsTransaction) =>
          moment(transaction.transactionDate).format("YYYY") === year
      )
      .reduce(function (accumulator: number, obj: IRightsTransaction) {
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
}
