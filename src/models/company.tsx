import moment from "moment";
import InflationService from "services/inflation/inflation-service";
import { ICompany } from "types/company";
import { DividendsTransaction } from "types/dividends-transaction";
import { RightsTransaction } from "types/rights-transaction";
import { SharesTransaction } from "types/shares-transaction";
import { IStockPrice } from "types/stock-price";
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
  stockPrices: IStockPrice[];
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
    this.stockPrices = parameters.stockPrices;

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

  getDividendsAmount(): number {
    const amount = this.dividendsTransactions.reduce(function (
      accumulator: number,
      obj: DividendsTransaction
    ) {
      return accumulator + obj.price * obj.count;
    },
    0);
    return amount;
  }
  getLatestStockPrice(): IStockPrice {
    const max = this.stockPrices.reduce(function (prev, current) {
      var previousDate = moment(prev.transactionDate);
      var currentDate = moment(current.transactionDate);
      return previousDate > currentDate ? prev : current;
    }); //returns object

    return max;
  }

  getTotalInvested(): number {
    // yearlyShares.investedAmount + yearlyShares.investmentCommission;
    const investedInShares = this.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          transaction.type === TransactionType.BUY
      )
      .reduce(function (accumulator: number, obj: SharesTransaction) {
        return accumulator + (obj.count * obj.price + obj.commission);
      }, 0);

    const investedInRights = this.rightsTransactions.reduce(function (
      accumulator: number,
      obj: RightsTransaction
    ) {
      return accumulator + (obj.count * obj.price + obj.commission);
    },
    0);
    return investedInShares + investedInRights;
  }

  getPortfolioValue(): number {
    // shares * last stock price
    const sharesCount = this.getSharesCount();
    const lastStockPrice = this.getLatestStockPrice();

    if (lastStockPrice === null) {
      return 0;
    }

    return sharesCount * lastStockPrice.price;
  }

  getPortfolioValueWithInflation(): number {
    const lastStockPrice = this.getLatestStockPrice();
    const portfolioValue = this.getPortfolioValue();
    var lastDate = moment(lastStockPrice.transactionDate);

    const inflationForYear = InflationService.calculateInflationForYear(
      lastDate.year().toString()
    );
    return portfolioValue / (1 + inflationForYear);
  }

  getCurrentYearReturn(): number {
    // const portfolioValueWithInflation = this.getPortfolioValueWithInflation();
    // const acumReturn = portfolioValueWithInflation - accumulatedInvestment;
    // return acumReturn;
    return 0;
  }
}
