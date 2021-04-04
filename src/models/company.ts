import moment from "moment";
import InflationService from "services/inflation/inflation-service";
import {
  ICompanyReturns,
  ICompany,
  ICompanyDividends,
  ICompanyInvestment,
  ICompanyShares,
  ICompanyStockPrices,
  ICompanyPortfolioValue
} from "types/company";
import { DividendsTransaction } from "types/dividends-transaction";
import { RightsTransaction } from "types/rights-transaction";
import { SharesTransaction } from "types/shares-transaction";
import { IStockPrice } from "types/stock-price";
import { CompanyDividends } from "./company-parts/company-dividends/company-dividends";
import { CompanyInvestment } from "./company-parts/company-investment/company-investment";
import { CompanyPortfolioValue } from "./company-parts/company-portfolio-value/company-portfolio-value";
import { CompanyReturns } from "./company-parts/company-returns/company-returns";
import { CompanyShares } from "./company-parts/company-shares/company-shares";
import { CompanyStockPrices } from "./company-parts/company-stock-prices/company-stock-prices";

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
  prices: ICompanyStockPrices;
  portfolioValue: ICompanyPortfolioValue;

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
    this.prices = new CompanyStockPrices(this.stockPrices);
    this.portfolioValue = new CompanyPortfolioValue(this.name, this.prices, this.shares)
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
