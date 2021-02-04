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
  portfolioId: string;
  portfolioName: string;
  portfolioCurrencySymbol: string;

  constructor(parameters: ICompany) {
    this.id = parameters.id;
    this.portfolioName = parameters.portfolioName;
    this.portfolioId = parameters.portfolioId;

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
    this.portfolioCurrencySymbol = parameters.portfolioCurrencySymbol;
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

  getDividendsAmount(inBaseCurrency = false): number {
    const amount = this.dividendsTransactions.reduce(function (
      accumulator: number,
      obj: DividendsTransaction
    ) {
      if (inBaseCurrency) {
        return accumulator + obj.price * obj.exchangeRate * obj.count;
      }
      return accumulator + obj.price * obj.count;
    },
    0);
    return amount;
  }

  getLatestStockPrice(): IStockPrice | null {
    if (this.stockPrices.length < 1) {
      return null;
    }

    const max = this.stockPrices.reduce(function (prev, current) {
      var previousDate = moment(prev.transactionDate);
      var currentDate = moment(current.transactionDate);
      return previousDate > currentDate ? prev : current;
    });

    return max;
  }

  getTotalInvested(inBaseCurrency = false): number {
    // yearlyShares.investedAmount + yearlyShares.investmentCommission;
    const investedInShares = this.getInvestedInShares(inBaseCurrency);
    const investedInRights = this.getInvestedInRights(inBaseCurrency);
    return investedInShares + investedInRights;
  }

  private getInvestedInShares(inBaseCurrency: boolean) {
    return this.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          transaction.type === TransactionType.BUY
      )
      .reduce(function (accumulator: number, obj: SharesTransaction) {
        if (inBaseCurrency) {
          return (
            accumulator +
            (obj.count * (obj.price * obj.exchangeRate) +
              obj.commission * obj.exchangeRate)
          );
        }
        return accumulator + (obj.count * obj.price + obj.commission);
      }, 0);
  }

  private getInvestedInRights(inBaseCurrency: boolean) {
    return this.rightsTransactions.reduce(function (
      accumulator: number,
      obj: RightsTransaction
    ) {
      if (inBaseCurrency) {
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

  getPortfolioValue(inBaseCurrency = false): number {
    // shares * last stock price
    const sharesCount = this.getSharesCount();
    const lastStockPrice = this.getLatestStockPrice();

    if (lastStockPrice === null) {
      return 0;
    }
    if (inBaseCurrency) {
      return sharesCount * (lastStockPrice.price * lastStockPrice.exchangeRate);
    }
    return sharesCount * lastStockPrice.price;
  }

  getPortfolioValueWithInflation(inBaseCurrency = false): number {
    const lastStockPrice = this.getLatestStockPrice();

    if (lastStockPrice) {
      const portfolioValue = this.getPortfolioValue(inBaseCurrency);
      var lastDate = moment(lastStockPrice.transactionDate);

      const inflationForYear = InflationService.calculateInflationForYear(
        lastDate.year().toString()
      );
      return portfolioValue / (1 + inflationForYear);
    }
    return 0;
  }

  getReturn(inBaseCurrency = false): number {
    const portfolioValueWithInflation = this.getPortfolioValueWithInflation(
      inBaseCurrency
    );
    const totalInvested = this.getTotalInvested(inBaseCurrency);
    const totalReturn = portfolioValueWithInflation - totalInvested;
    // return acumReturn;
    return totalReturn;
  }

  getReturnWithDividends(inBaseCurrency = false): number {
    const totalReturn = this.getReturn(inBaseCurrency);
    const dividendsAmount = this.getDividendsAmount(inBaseCurrency);
    return totalReturn + dividendsAmount;
  }

  getReturnPercentage(inBaseCurrency = false): number {
    const totalReturn = this.getReturn(inBaseCurrency);
    const totalInvested = this.getTotalInvested(inBaseCurrency);

    if (totalInvested === 0) {
      return 0;
    }

    const returnPercentage = (totalReturn / totalInvested) * 100;

    return returnPercentage;
  }

  getReturnWithDividendsPercentage(inBaseCurrency = false): number {
    const totalReturn = this.getReturnWithDividends(inBaseCurrency);
    const totalInvested = this.getTotalInvested(inBaseCurrency);

    if (totalInvested === 0) {
      return 0;
    }

    const returnPercentage = (totalReturn / totalInvested) * 100;

    return returnPercentage;
  }

  getYoc(inBaseCurrency = false): number {
    const dividendsAmount = this.getDividendsAmount(inBaseCurrency);
    const totalInvested = this.getTotalInvested(inBaseCurrency);

    const yoc = (dividendsAmount / totalInvested) * 100;
    return yoc;
  }

  getRpd(inBaseCurrency = false): number {
    const dividendsAmount = this.getDividendsAmount(inBaseCurrency);
    const totalInvested = this.getPortfolioValue(inBaseCurrency);

    const rpd = (dividendsAmount / totalInvested) * 100;
    return rpd;
  }
}
