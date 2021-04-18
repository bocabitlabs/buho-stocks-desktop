import moment from "moment";
import { ICompanyStockPrices } from "types/company-parts/stock-prices-part/stock-prices-part";
import { IStockPrice } from "types/stock-price";

export class CompanyStockPrices implements ICompanyStockPrices {
  stockPrices: IStockPrice[];
  constructor(stockPrices: IStockPrice[]) {
    this.stockPrices = stockPrices;
  }

  getLatestStockPrice(inPortfolioCurrency?: boolean): IStockPrice | null {
    if (this.stockPrices.length < 1) {
      return null;
    }

    const max = this.stockPrices.reduce(function (prev, current) {
      var previousDate = moment(prev.transactionDate);
      var currentDate = moment(current.transactionDate);
      return previousDate > currentDate ? prev : current;
    });

    const newMax = {};
    const returnedTarget = Object.assign(newMax, max);

    if (inPortfolioCurrency) {
      returnedTarget.price = returnedTarget.price * returnedTarget.exchangeRate;
    }
    return returnedTarget;
  }

  getLatestStockPriceForYear(
    year: string,
    inPortfolioCurrency?: boolean
  ): IStockPrice | null {
    if (this.stockPrices.length < 1) {
      return null;
    }
    if (this.stockPrices.length > 0) {
      const currentYearStockPrices = this.stockPrices.filter(
        (transaction: IStockPrice) =>
          moment(transaction.transactionDate).format("YYYY") === year
      );
      if (currentYearStockPrices.length > 0) {
        const max = currentYearStockPrices.reduce(function (prev, current) {
          var previousDate = moment(prev.transactionDate);
          var currentDate = moment(current.transactionDate);
          return previousDate > currentDate ? prev : current;
        });

        const newMax = {};
        const returnedTarget = Object.assign(newMax, max);
        if (inPortfolioCurrency) {
          returnedTarget.price =
            returnedTarget.price * returnedTarget.exchangeRate;
        }
        return returnedTarget;
      }
    }

    return null;
  }
}