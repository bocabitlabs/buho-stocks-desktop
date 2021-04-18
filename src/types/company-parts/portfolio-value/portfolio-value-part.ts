import { ICompanyShares } from "../shares-part/shares-part";
import { ICompanyStockPrices } from "../stock-prices-part/stock-prices-part";

export interface ICompanyPortfolioValue{
  prices: ICompanyStockPrices;
  shares: ICompanyShares;
  companyName: string;
  getPortfolioValue(inPortfolioCurrency?: boolean): number;
  getPortfolioValueForYear(year: string, inPortfolioCurrency?: boolean): number;
}