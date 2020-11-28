import StockPriceDAO from "../database/daos/stock-price-dao";
import { StockPriceItemProps } from "../types/stock-price";

export default class StockPriceService {
  add = (stockPrice: StockPriceItemProps) => {
    return new StockPriceDAO().add(stockPrice);
  };

  getStockPrices = (companyId: string) => {
    return new StockPriceDAO().getStockPrices(companyId);
  };

  getLastStockPricePerYearByCompanyId = (companyId: string, year: string) => {
    return new StockPriceDAO().getLastStockPricePerYearByCompanyId(companyId, year);
  };

  deleteById = (shareId: string) => {
    return new StockPriceDAO().deleteById(shareId);
  };
}