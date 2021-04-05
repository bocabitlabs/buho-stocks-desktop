import { DividendsTransaction } from "./dividends-transaction";
import { RightsTransaction } from "./rights-transaction";
import { SharesTransaction } from "./shares-transaction";
import { IStockPrice } from "./stock-price";

export interface CompanyFormFields {
  countryCode: string;
  name: string;
  ticker: string;
  broker: string;
  closed: boolean;
  url: string;
  description: string;
  currencyId: string;
  dividendsCurrencyId: string;
  marketId: string;
  sectorId: string;
  color: string;
  portfolioId: string;
  alternativeTickers: string;
}

export interface ICompanyDividends {
  dividendsTransactions: DividendsTransaction[];
  getDividendsAmount(
    inPortfolioCurrency?: boolean,
    includeCommission?: boolean
  ): number;
  getCumulativeDividendsAmountForYear(
    year: string,
    inPortfolioCurrency?: boolean,
    includeCommission?: boolean
  ): number;
  getDividendsAmountForYear(
    year: string,
    inPortfolioCurrency?: boolean,
    includeCommission?: boolean
  ): number;
  getMonthlyDividendsForYear(
    year: string,
    inPortfolioCurrency?: boolean
  ): number;
}

export interface ICompanyInvestment {
  sharesTransactions: SharesTransaction[];
  rightsTransactions: RightsTransaction[];
  getTotalInvested(inPortfolioCurrency?: boolean): number;
  getTotalInvestedUntilYear(
    year: string,
    inPortfolioCurrency?: boolean
  ): number;
  getTotalInvestedOnYear(year: string, inPortfolioCurrency?: boolean): number;
}

export interface ICompanyStockPrices {
  stockPrices: IStockPrice[];
  getLatestStockPrice(inPortfolioCurrency?: boolean): IStockPrice | null;
  getLatestStockPriceForYear(
    year: string,
    inPortfolioCurrency?: boolean
  ): IStockPrice | null;
}

export interface ICompanyShares {
  sharesTransactions: SharesTransaction[];
  getSharesCount: Function;
  getSharesCountForYear(year: string): number;
  getCumulativeSharesCountUntilYear(year: string): number;
}

export interface ICompanyPortfolioValue{
  prices: ICompanyStockPrices;
  shares: ICompanyShares;
  companyName: string;
  getPortfolioValue(inPortfolioCurrency?: boolean): number;
  getPortfolioValueForYear(year: string, inPortfolioCurrency?: boolean): number;
}

export interface ICompanyReturns {
  sharesTransactions: SharesTransaction[];
  dividendsTransactions: DividendsTransaction[];
  investment: ICompanyInvestment;
  dividends: ICompanyDividends;
  portfolioValue: ICompanyPortfolioValue;
  closed: boolean;

  getReturn(inPortfolioCurrency?: boolean): number;
  getReturnForYear(year: string, inPortfolioCurrency?: boolean): number;
  getReturnWithDividends(
    inPortfolioCurrency?: boolean,
    includeCommission?: boolean
  ): number;
  getReturnWithDividendsForYear(
    year: string,
    inPortfolioCurrency?: boolean,
    includeCommission?: boolean
  ): number;
  getReturnWithDividendsPercentage(
    inPortfolioCurrency?: boolean,
    includeCommission?: boolean
  ): number;
  getReturnFromSalesForYear(
    year: string,
    inPortfolioCurrency?: boolean
  ): number;
  getReturnFromSales(inPortfolioCurrency?: boolean): number;
  getReturnPercentage(inPortfolioCurrency?: boolean): number;
  getReturnPercentageForYear(
    year: string,
    inPortfolioCurrency?: boolean
  ): number;
  getReturnPercentageForYearWithDiviends(
    year: string,
    inPortfolioCurrency?: boolean,
    includeCommission?: boolean
  ): number;
  getReturnPercentageCumulativeForYear(
    year: string,
    inPortfolioCurrency?: boolean
  ): number;
  getReturnPercentageCumulativeWithDividendsForYear(
    year: string,
    inPortfolioCurrency?: boolean
  ): number;
}

export interface ICompany extends CompanyFormFields {
  id: string;
  portfolioName: string;
  portfolioCurrencySymbol: string;
  portfolioCurrencyAbbreviation: string;
  dividendsCurrencySymbol: string;
  dividendsCurrencyAbbreviation: string;
  currencyName: string;
  currencyAbbreviation: string;
  sectorName: string;
  currencySymbol: string;
  stockPrices: IStockPrice[];
  sharesTransactions: SharesTransaction[];
  dividendsTransactions: DividendsTransaction[];
  rightsTransactions: RightsTransaction[];
  // Components
  dividends: ICompanyDividends;
  investment: ICompanyInvestment;
  shares: ICompanyShares;
  prices: ICompanyStockPrices;
  portfolioValue: ICompanyPortfolioValue;
  returns: ICompanyReturns;

  getYoc(inPortfolioCurrency?: boolean): number;
  getRpd(inPortfolioCurrency?: boolean): number;
}
