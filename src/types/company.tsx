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
  portfolio: string;
}

export interface ICompany extends CompanyFormFields {
  id: string;
  portfolioName: string;
  currencyName: string;
  sectorName: string;
  currencySymbol: string;
  stockPrices: IStockPrice[];
  sharesTransactions: SharesTransaction[];
  dividendsTransactions: DividendsTransaction[];
  rightsTransactions: RightsTransaction[];
  getSharesCount: Function;
  getDividendsAmount: Function;
  getLatestStockPrice: Function;
  getTotalInvested: Function;
  getPortfolioValue: Function;
  getPortfolioValueWithInflation: Function;
  getCurrentYearReturn: Function
}
