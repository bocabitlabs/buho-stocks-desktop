import { IStockPrice } from "types/stock-price";

export interface ICompanyStockPrices {
  stockPrices: IStockPrice[];
  getLatestStockPrice(inPortfolioCurrency?: boolean): IStockPrice | null;
  getLatestStockPriceForYear(
    year: string,
    inPortfolioCurrency?: boolean
  ): IStockPrice | null;
}
