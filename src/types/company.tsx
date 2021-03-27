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
  marketId: string;
  sectorId: string;
  color: string;
  portfolioId: string;
  alternativeTickers: string;
}

export interface ICompany extends CompanyFormFields {
  id: string;
  portfolioName: string;
  portfolioCurrencySymbol: string;
  portfolioCurrencyAbbreviation: string;
  currencyName: string;
  currencyAbbreviation: string;
  sectorName: string;
  currencySymbol: string;
  stockPrices: IStockPrice[];
  sharesTransactions: SharesTransaction[];
  dividendsTransactions: DividendsTransaction[];
  rightsTransactions: RightsTransaction[];
  getSharesCount: Function;
  getSharesCountForYear (year:string): number;
  getCumulativeSharesCountUntilYear(year: string): number;
  getDividendsAmount(inBaseCurrency?: boolean): number;
  getCumulativeDividendsAmountForYear(year:string, inBaseCurrency?: boolean): number;
  getReturnFromSales(inBaseCurrency?: boolean): number;
  getDividendsAmountForYear(year:string, inBaseCurrency?: boolean): number;
  getMonthlyDividendsForYear(year: string, inBaseCurrency?: boolean): number;
  getLatestStockPrice(inBaseCurrency?: boolean): IStockPrice | null;
  getLatestStockPriceForYear(year:string, inBaseCurrency?: boolean): IStockPrice | null;
  getTotalInvested(inBaseCurrency?: boolean): number;
  getTotalInvestedUntilYear(year:string, inBaseCurrency?: boolean): number;
  getTotalInvestedOnYear(year:string, inBaseCurrency?: boolean): number;
  getPortfolioValue(inBaseCurrency?: boolean): number;
  getPortfolioValueForYear(year:string, inBaseCurrency?: boolean): number;
  getPortfolioValueWithInflation(inBaseCurrency?: boolean): number;
  getReturn(inBaseCurrency?: boolean): number;
  getReturnForYear(year: string, inBaseCurrency?: boolean): number;
  getYoc(inBaseCurrency?: boolean): number;
  getRpd(inBaseCurrency?: boolean): number;
  getReturnPercentage(inBaseCurrency?: boolean): number;
  getReturnPercentageForYear(year: string, inBaseCurrency?: boolean): number;
  getReturnPercentageForYearWithDiviends(year: string, inBaseCurrency?: boolean): number;
  getReturnPercentageCumulativeForYear(year: string, inBaseCurrency?: boolean): number;
  getReturnPercentageCumulativeWithDividendsForYear(year: string, inBaseCurrency?: boolean): number;
  getReturnWithDividends(inBaseCurrency?: boolean): number;
  getReturnWithDividendsForYear(year: string, inBaseCurrency?: boolean): number;
  getReturnWithDividendsPercentage(inBaseCurrency?: boolean): number;
  getReturnFromSalesForYear(year:string, inBaseCurrency?: boolean): number;
}
