import moment from "moment";

import { ICompany, ICompanyInvestment } from "types/company";
import { RightsTransaction } from "types/rights-transaction";
import { SharesTransaction } from "types/shares-transaction";
import { TransactionType } from "types/transaction";

export class CompanyInvestment implements ICompanyInvestment {
  company: ICompany;
  constructor(company: ICompany) {
    this.company = company;
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
    return this.company.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          transaction.type === TransactionType.BUY
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

  private getInvestedInSharesOnYear(
    year: string,
    inPortfolioCurrency: boolean
  ) {
    const amount = this.company.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          moment(transaction.transactionDate).format("YYYY") === year
      )
      .filter(
        (transaction: SharesTransaction) =>
          transaction.type === TransactionType.BUY
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
    return amount;
  }

  private getInvestedInRights(inPortfolioCurrency: boolean) {
    return this.company.rightsTransactions.reduce(function (
      accumulator: number,
      obj: RightsTransaction
    ) {
      if (inPortfolioCurrency) {
        return (
          accumulator +
          (obj.count * (obj.price * obj.exchangeRate) +
            obj.commission * obj.exchangeRate)
        );
      }
      return accumulator + (obj.count * obj.price + obj.commission);
    },
    0);
  }

  private getInvestedInSharesUntilYear(
    year: string,
    inPortfolioCurrency: boolean
  ) {
    return this.company.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          transaction.type === TransactionType.BUY &&
          moment(transaction.transactionDate, "YYYY-MM-DD").isBefore(
            moment(year + "-12-31", "YYYY-MM-DD")
          )
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

  private getInvestedInRightsUntilYear(
    year: string,
    inPortfolioCurrency: boolean
  ) {
    return this.company.rightsTransactions
      .filter((transaction: RightsTransaction) =>
        moment(transaction.transactionDate, "YYYY-MM-DD").isBefore(
          moment(year + "-12-31", "YYYY-MM-DD")
        )
      )
      .reduce(function (accumulator: number, obj: RightsTransaction) {
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
    return this.company.rightsTransactions
      .filter(
        (transaction: RightsTransaction) =>
          moment(transaction.transactionDate).format("YYYY") === year
      )
      .reduce(function (accumulator: number, obj: RightsTransaction) {
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
