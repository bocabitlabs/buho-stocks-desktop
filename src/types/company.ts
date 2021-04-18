import { ICompanyDividends } from "./company-parts/dividends-part/dividends-part";
import { ICompanyInvestment } from "./company-parts/investment-part/investment-part";
import { ICompanyPortfolioValue } from "./company-parts/portfolio-value/portfolio-value-part";
import { ICompanyReturns } from "./company-parts/returns-part/returns-part";
import { ICompanyShares } from "./company-parts/shares-part/shares-part";
import { ICompanyStockPrices } from "./company-parts/stock-prices-part/stock-prices-part";
import { IDividendsTransaction } from "./dividends-transaction";
import { IRightsTransaction } from "./rights-transaction";
import { ISharesTransaction } from "./shares-transaction";
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
  superSectorName: string;
  currencySymbol: string;
  stockPrices: IStockPrice[];
  sharesTransactions: ISharesTransaction[];
  dividendsTransactions: IDividendsTransaction[];
  rightsTransactions: IRightsTransaction[];
  // Composition
  dividends: ICompanyDividends;
  investment: ICompanyInvestment;
  shares: ICompanyShares;
  prices: ICompanyStockPrices;
  portfolioValue: ICompanyPortfolioValue;
  returns: ICompanyReturns;

  getYoc(inPortfolioCurrency?: boolean): number;
  getRpd(inPortfolioCurrency?: boolean): number;
}
