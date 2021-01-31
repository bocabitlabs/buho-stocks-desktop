import { ICompany } from "types/company";
import { DividendsTransaction } from "types/dividends-transaction";
import { RightsTransaction } from "types/rights-transaction";
import { SharesTransaction } from "types/shares-transaction";
import { TransactionType } from "types/transaction";

export class Company implements ICompany {
  id: string;
  portfolioName: string;
  currencyName: string;
  sectorName: string;
  currencySymbol: string;
  sharesTransactions: SharesTransaction[];
  dividendsTransactions: DividendsTransaction[];
  rightsTransactions: RightsTransaction[];
  name: string;
  ticker: string;
  url: string;
  description: string;
  currency: string;
  market: string;
  sector: string;
  color: string;
  portfolio: string;

  constructor(parameters: ICompany) {
    this.id = parameters.id;
    this.portfolioName = parameters.portfolioName;
    this.portfolio = parameters.portfolio;

    this.currencyName = parameters.currencyName;
    this.currencySymbol = parameters.currencySymbol;
    this.currency = parameters.currency;

    this.sectorName = parameters.sectorName;
    this.sector = parameters.sector;

    this.dividendsTransactions = parameters.dividendsTransactions;
    this.sharesTransactions = parameters.sharesTransactions;
    this.rightsTransactions = parameters.rightsTransactions;

    this.name = parameters.name;
    this.ticker = parameters.ticker;
    this.url = parameters.url;
    this.market = parameters.market;
    this.color = parameters.color;
    this.description = parameters.description;
  }

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
    const rightsShares = this.rightsTransactions.reduce(function (
      accumulator: number,
      obj: RightsTransaction
    ) {
      return accumulator + obj.shares;
    },
    0);

    return buyCount + rightsShares - sellCount;
  }
}
