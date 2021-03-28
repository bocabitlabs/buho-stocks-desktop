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
  countryCode: string;
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
  currencyId: string;
  marketId: string;
  sectorId: string;
  color: string;
  portfolioId: string;
  portfolioName: string;
  portfolioCurrencySymbol: string;
  portfolioCurrencyAbbreviation: string;
  currencyAbbreviation: string;
  broker: string;
  closed: boolean;
  alternativeTickers: string;

  constructor(parameters: ICompany) {
    this.id = parameters.id;

    this.countryCode = parameters.countryCode;
    this.portfolioName = parameters.portfolioName;
    this.portfolioId = parameters.portfolioId;

    this.currencyName = parameters.currencyName;
    this.currencySymbol = parameters.currencySymbol;
    this.currencyAbbreviation = parameters.currencyAbbreviation;
    this.currencyId = parameters.currencyId;

    this.sectorName = parameters.sectorName;
    this.sectorId = parameters.sectorId;

    this.dividendsTransactions = parameters.dividendsTransactions;
    this.sharesTransactions = parameters.sharesTransactions;
    this.rightsTransactions = parameters.rightsTransactions;
    this.stockPrices = parameters.stockPrices;

    this.name = parameters.name;
    this.ticker = parameters.ticker;
    this.url = parameters.url;
    this.marketId = parameters.marketId;
    this.color = parameters.color;
    this.description = parameters.description;
    this.portfolioCurrencySymbol = parameters.portfolioCurrencySymbol;
    this.portfolioCurrencyAbbreviation =
      parameters.portfolioCurrencyAbbreviation;
    this.broker = parameters.broker;
    this.closed = parameters.closed;
    this.alternativeTickers = parameters.alternativeTickers;
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

    // console.debug(
    //   `getAccumulatedSharesCountForYear ${year}: Return ${buyCount - sellCount}`
    // );
    return buyCount - sellCount;
  }

  getDividendsAmount(inBaseCurrency = false): number {
    const amount = this.dividendsTransactions.reduce(function (
      accumulator: number,
      obj: DividendsTransaction
    ) {
      let exchangeRate = 1;
      if (inBaseCurrency) {
        exchangeRate = obj.exchangeRate;
      }
      return (
        accumulator + (obj.price * exchangeRate * obj.count - obj.commission)
      );
    },
    0);
    return amount;
  }

  getDividendsAmountForYear(year: string, inBaseCurrency?: boolean): number {
    const amount = this.dividendsTransactions
      .filter(
        (transaction: DividendsTransaction) =>
          moment(transaction.transactionDate).format("YYYY") === year
      )
      .reduce(function (accumulator: number, obj: DividendsTransaction) {
        let exchangeRate = 1;
        if (inBaseCurrency) {
          exchangeRate = obj.exchangeRate;
        }
        return (
          accumulator + (obj.price * exchangeRate * obj.count - obj.commission)
        );
      }, 0);
    return amount;
  }

  getCumulativeDividendsAmountForYear(
    year: string,
    inBaseCurrency?: boolean
  ): number {
    const amount = this.dividendsTransactions
      .filter((transaction: DividendsTransaction) => {
        return moment(transaction.transactionDate, "YYYY-MM-DD").isBefore(
          moment(year + "-12-31", "YYYY-MM-DD")
        );
      })
      .reduce(function (accumulator: number, obj: DividendsTransaction) {
        let exchangeRate = 1;
        if (inBaseCurrency) {
          exchangeRate = obj.exchangeRate;
        }
        return (
          accumulator + (obj.price * exchangeRate * obj.count - obj.commission)
        );
      }, 0);
    return amount;
  }

  getMonthlyDividendsForYear(year: string, inBaseCurrency?: boolean): number {
    return this.getDividendsAmountForYear(year, inBaseCurrency) / 12;
  }

  getLatestStockPrice(inBaseCurrency?: boolean): IStockPrice | null {
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

    if (inBaseCurrency) {
      returnedTarget.price = returnedTarget.price * returnedTarget.exchangeRate;
    }
    return returnedTarget;
  }

  getLatestStockPriceForYear(
    year: string,
    inBaseCurrency?: boolean
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
        if (inBaseCurrency) {
          returnedTarget.price =
            returnedTarget.price * returnedTarget.exchangeRate;
        }
        return returnedTarget;
      }
    }

    return null;
  }

  getTotalInvested(inBaseCurrency = false): number {
    // yearlyShares.investedAmount + yearlyShares.investmentCommission;
    const investedInShares = this.getInvestedInShares(inBaseCurrency);
    const investedInRights = this.getInvestedInRights(inBaseCurrency);
    return investedInShares + investedInRights;
  }

  getTotalInvestedUntilYear(year: string, inBaseCurrency = false): number {
    // yearlyShares.investedAmount + yearlyShares.investmentCommission;
    const investedInShares = this.getInvestedInSharesUntilYear(
      year,
      inBaseCurrency
    );
    const investedInRights = this.getInvestedInRightsUntilYear(
      year,
      inBaseCurrency
    );
    return investedInShares + investedInRights;
  }

  getTotalInvestedOnYear(year: string, inBaseCurrency = false): number {
    // yearlyShares.investedAmount + yearlyShares.investmentCommission;
    const investedInShares = this.getInvestedInSharesOnYear(
      year,
      inBaseCurrency
    );
    const investedInRights = this.getInvestedInRightsForYear(
      year,
      inBaseCurrency
    );
    const amount = investedInShares + investedInRights;

    return amount;
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

  private getInvestedInSharesOnYear(year: string, inBaseCurrency: boolean) {
    const amount = this.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          moment(transaction.transactionDate).format("YYYY") === year
      )
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
    return amount;
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

  private getInvestedInSharesUntilYear(year: string, inBaseCurrency: boolean) {
    return this.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          transaction.type === TransactionType.BUY &&
          moment(transaction.transactionDate, "YYYY-MM-DD").isBefore(
            moment(year + "-12-31", "YYYY-MM-DD")
          )
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

  private getInvestedInRightsUntilYear(year: string, inBaseCurrency: boolean) {
    return this.rightsTransactions
      .filter((transaction: RightsTransaction) =>
        moment(transaction.transactionDate, "YYYY-MM-DD").isBefore(
          moment(year + "-12-31", "YYYY-MM-DD")
        )
      )
      .reduce(function (accumulator: number, obj: RightsTransaction) {
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

  private getInvestedInRightsForYear(year: string, inBaseCurrency: boolean) {
    return this.rightsTransactions
      .filter(
        (transaction: RightsTransaction) =>
          moment(transaction.transactionDate).format("YYYY") === year
      )
      .reduce(function (accumulator: number, obj: RightsTransaction) {
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

  getPortfolioValue(inBaseCurrency = false): number {
    const sharesCount = this.getSharesCount();
    const lastStockPrice = this.getLatestStockPrice(inBaseCurrency);

    if (lastStockPrice === null || sharesCount === 0) {
      return 0;
    }

    return sharesCount * lastStockPrice.price;
  }

  getPortfolioValueForYear(
    year: string,
    inBaseCurrency = false
  ): number {
    let accumulated = 0;

    const sharesCount = this.getCumulativeSharesCountUntilYear(year);
    const lastStockPrice = this.getLatestStockPriceForYear(
      year,
      inBaseCurrency
    );
    if (sharesCount > 0 && lastStockPrice === null) {
      console.error(
        `${this.name}: No stock price value for ${year}. shares: ${sharesCount}`
      );
    }

    if (
      lastStockPrice !== null &&
      lastStockPrice !== undefined &&
      sharesCount !== 0
    ) {
      accumulated = sharesCount * lastStockPrice.price;
    }

    return accumulated;
  }

  getPortfolioValueWithInflation(inBaseCurrency = false): number {
    const lastStockPrice = this.getLatestStockPrice(inBaseCurrency);

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

  getReturnFromSales = (inBaseCurrency = false) => {
    return this.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          transaction.type === TransactionType.SELL
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
  };

  getReturnFromSalesForYear = (year: string, inBaseCurrency = false) => {
    return this.sharesTransactions
      .filter(
        (transaction: SharesTransaction) =>
          moment(transaction.transactionDate).format("YYYY") === year
      )
      .filter(
        (transaction: SharesTransaction) =>
          transaction.type === TransactionType.SELL
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
  };

  getReturn(inBaseCurrency = false): number {
    const totalInvested = this.getTotalInvested(inBaseCurrency);
    const portfolioValue = this.getPortfolioValue(inBaseCurrency);
    let returnFromSales = this.getReturnFromSales(inBaseCurrency);
    let totalReturn = 0;
    if (this.closed) {
      totalReturn = returnFromSales - totalInvested;
    } else {
      totalReturn = portfolioValue - totalInvested;
    }
    return totalReturn;
  }

  /**
   * This one is OK
   * @param year
   * @param years
   * @param inBaseCurrency
   * @returns
   */
  getReturnForYear(
    year: string,
    inBaseCurrency = false
  ): number {
    // R4-(R3+E4)
    // portfolioValue - (previousPortfolioValue + investedCurrentYear)
    const R3 = this.getPortfolioValueForYear(
      (parseInt(year) - 1).toString(),
      inBaseCurrency
    );
    const R4 = this.getPortfolioValueForYear(year, inBaseCurrency);
    const E4 = this.getTotalInvestedOnYear(year, inBaseCurrency);
    let amount = R4 - (R3 + E4);

    return amount;
  }

  /**
   * This one is ok
   * @param inBaseCurrency
   * @returns
   */
  getReturnWithDividends(inBaseCurrency = false): number {
    const totalReturn = this.getReturn(inBaseCurrency);
    const dividendsAmount = this.getDividendsAmount(inBaseCurrency);
    return totalReturn + dividendsAmount;
  }

  /**
   * Should be OK
   * @param year
   * @param years
   * @param inBaseCurrency
   * @returns
   */
  getReturnWithDividendsForYear(
    year: string,
    inBaseCurrency = false
  ): number {
    const totalReturn = this.getReturnForYear(year, inBaseCurrency);
    const dividendsAmount = this.getCumulativeDividendsAmountForYear(
      year,
      inBaseCurrency
    );
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

  getReturnPercentageForYear(
    year: string,
    inBaseCurrency = false
  ): number {

    const Q3 = this.getPortfolioValueForYear(
      (parseInt(year) - 1).toString(),
      inBaseCurrency
    );
    const Q4 = this.getPortfolioValueForYear(year, inBaseCurrency);
    const E4 = this.getTotalInvestedOnYear(year, inBaseCurrency);
    let returnPercentage = 0;
    if (Q3 + E4 !== 0) {
      returnPercentage = (Q4 - (Q3 + E4)) / (Q3 + E4);
    }
    console.log(`${Q4} -(${Q3} + ${E4})/ ((${Q3} + ${E4})) = ${returnPercentage*100}`)

    return returnPercentage * 100;
  }

  getReturnPercentageForYearWithDiviends(
    year: string,
    inBaseCurrency = false
  ): number {

    const Q3 = this.getPortfolioValueForYear(
      (parseInt(year) - 1).toString(),
      inBaseCurrency
    );
    const Q4 = this.getPortfolioValueForYear(year, inBaseCurrency);
    const E4 = this.getTotalInvestedOnYear(year, inBaseCurrency);
    const F4 = this.getDividendsAmountForYear(year, inBaseCurrency);

    let returnPercentage = 0;
    if (Q3 + E4 !== 0) {
      returnPercentage = (Q4 + F4 - (Q3 + E4)) / (Q3 + E4);
    }
    console.log(`${Q4} -(${Q3} + ${E4})/ ((${Q3} + ${E4})) = ${returnPercentage*100}`)

    return returnPercentage * 100;
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

  /**
   * This one is OK
   * @param year
   * @param years
   * @param inBaseCurrency
   * @returns
   */
  getReturnPercentageCumulativeForYear(
    year: string,
    inBaseCurrency = false
  ): number {
    const Q4 = this.getPortfolioValueForYear(year, inBaseCurrency);
    const F4 = this.getTotalInvestedUntilYear(year, inBaseCurrency);
    console.debug(`Amount invested in ${year}: ${F4} -> ${Q4}`)

    let amount = 0;
    if (F4 > 0) {
      amount = (Q4 - F4) / F4;
    }

    return amount * 100;
  }

    /**
   * This one is OK
   * @param year
   * @param years
   * @param inBaseCurrency
   * @returns
   */
     getReturnPercentageCumulativeWithDividendsForYear(
      year: string,
      inBaseCurrency = false
    ): number {
      const Q4 = this.getPortfolioValueForYear(year, inBaseCurrency);
      const D1 = this.getCumulativeDividendsAmountForYear(year, inBaseCurrency);

      const F4 = this.getTotalInvestedUntilYear(year, inBaseCurrency);
      let amount = 0;
      if (F4 > 0) {
        amount = (Q4 + D1 - F4) / F4;
      }

      return amount * 100;
    }

  getYoc(inBaseCurrency = false): number {
    const dividendsAmount = this.getDividendsAmount(inBaseCurrency);
    const totalInvested = this.getTotalInvested(inBaseCurrency);

    const yoc = (dividendsAmount / totalInvested) * 100;
    return yoc;
  }

  getRpd(inBaseCurrency = false): number {
    const dividendsAmount = this.getDividendsAmount(inBaseCurrency);
    const totalInvested = this.getTotalInvested(inBaseCurrency);

    const rpd = (dividendsAmount / totalInvested) * 100;
    return rpd;
  }
}
