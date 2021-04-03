import moment from "moment";
import InflationService from "services/inflation/inflation-service";
import {
  ICompanyReturns,
  ICompany,
  ICompanyDividends,
  ICompanyInvestment,
  ICompanyShares
} from "types/company";
import { DividendsTransaction } from "types/dividends-transaction";
import { RightsTransaction } from "types/rights-transaction";
import { SharesTransaction } from "types/shares-transaction";
import { IStockPrice } from "types/stock-price";
import { CompanyDividends } from "./company-parts/company-dividends/company-dividends";
import { CompanyInvestment } from "./company-parts/company-investment/company-investment";
import { CompanyReturns } from "./company-parts/company-returns";
import { CompanyShares } from "./company-parts/company-shares/company-shares";

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
  dividendsCurrencyId: string;
  dividendsCurrencySymbol: string;
  dividendsCurrencyAbbreviation: string;
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
  returns: ICompanyReturns;
  dividends: ICompanyDividends;
  investment: ICompanyInvestment;
  shares: ICompanyShares;

  constructor(parameters: ICompany) {
    this.id = parameters.id;

    this.countryCode = parameters.countryCode;
    this.portfolioName = parameters.portfolioName;
    this.portfolioId = parameters.portfolioId;

    this.currencyName = parameters.currencyName;
    this.currencySymbol = parameters.currencySymbol;
    this.currencyAbbreviation = parameters.currencyAbbreviation;
    this.currencyId = parameters.currencyId;
    this.dividendsCurrencyId = parameters.dividendsCurrencyId;
    this.dividendsCurrencySymbol = parameters.dividendsCurrencySymbol;
    this.dividendsCurrencyAbbreviation =
      parameters.dividendsCurrencyAbbreviation;

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
    this.returns = new CompanyReturns(this);
    this.dividends = new CompanyDividends(this.dividendsTransactions);
    this.investment = new CompanyInvestment(
      this.sharesTransactions,
      this.rightsTransactions
    );
    this.shares = new CompanyShares(this.sharesTransactions);
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

  getPortfolioValue(inPortfolioCurrency = false): number {
    const sharesCount = this.shares.getSharesCount();
    const lastStockPrice = this.getLatestStockPrice(inPortfolioCurrency);

    if (lastStockPrice === null || sharesCount === 0) {
      return 0;
    }

    return sharesCount * lastStockPrice.price;
  }

  getPortfolioValueForYear(year: string, inPortfolioCurrency = false): number {
    let accumulated = 0;

    const sharesCount = this.shares.getCumulativeSharesCountUntilYear(year);
    const lastStockPrice = this.getLatestStockPriceForYear(
      year,
      inPortfolioCurrency
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

  getPortfolioValueWithInflation(inPortfolioCurrency = false): number {
    const lastStockPrice = this.getLatestStockPrice(inPortfolioCurrency);

    if (lastStockPrice) {
      const portfolioValue = this.getPortfolioValue(inPortfolioCurrency);
      var lastDate = moment(lastStockPrice.transactionDate);

      const inflationForYear = InflationService.calculateInflationForYear(
        lastDate.year().toString()
      );
      return portfolioValue / (1 + inflationForYear);
    }
    return 0;
  }

  getYoc(inPortfolioCurrency = false): number {
    const dividendsAmount = this.dividends.getDividendsAmount(
      inPortfolioCurrency
    );
    const totalInvested = this.investment.getTotalInvested(inPortfolioCurrency);

    const yoc = (dividendsAmount / totalInvested) * 100;
    return yoc;
  }

  getRpd(inPortfolioCurrency = false): number {
    const dividendsAmount = this.dividends.getDividendsAmount(
      inPortfolioCurrency
    );
    const totalInvested = this.investment.getTotalInvested(inPortfolioCurrency);

    const rpd = (dividendsAmount / totalInvested) * 100;
    return rpd;
  }
}
