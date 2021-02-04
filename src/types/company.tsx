import { DividendsTransaction } from "./dividends-transaction";
import { RightsTransaction } from "./rights-transaction";
import { SharesTransaction } from "./shares-transaction";
import { IStockPrice } from "./stock-price";

export interface CompanyFormFields {
  name: string;
  ticker: string;
  url: string;
  description: string;
  currency: string;
  market: string;
  sector: string;
  color: string;
  portfolioId: string;
}

export interface ICompany extends CompanyFormFields {
  id: string;
  portfolioName: string;
  portfolioCurrencySymbol: string;
  currencyName: string;
  sectorName: string;
  currencySymbol: string;
  stockPrices: IStockPrice[];
  sharesTransactions: SharesTransaction[];
  dividendsTransactions: DividendsTransaction[];
  rightsTransactions: RightsTransaction[];
  getSharesCount: Function;
  getDividendsAmount(inBaseCurrency?: boolean): number;
  getLatestStockPrice: Function;
  getTotalInvested(inBaseCurrency?: boolean): number;
  getPortfolioValue(inBaseCurrency?: boolean): number;
  getPortfolioValueWithInflation(inBaseCurrency?: boolean): number;
  getReturn(inBaseCurrency?: boolean): number;
  getYoc(inBaseCurrency?: boolean): number;
  getRpd(inBaseCurrency?: boolean): number;
  getReturnPercentage(inBaseCurrency?: boolean): number;
  getReturnWithDividends(inBaseCurrency?: boolean): number;
  getReturnWithDividendsPercentage(inBaseCurrency?: boolean): number;
}
