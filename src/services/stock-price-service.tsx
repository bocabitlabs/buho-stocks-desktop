import StockPriceDAO from "database/daos/stock-price-dao";
import { StockPriceItemProps } from "types/stock-price";

export default class StockPriceService {
  static add = (stockPrice: StockPriceItemProps) => {
    return StockPriceDAO.add(stockPrice);
  };

  static getStockPrices = (companyId: string) => {
    return StockPriceDAO.getStockPrices(companyId);
  };

  static getLastStockPricePerYearByCompanyId = (companyId: string, year: string) => {
    return StockPriceDAO.getLastStockPricePerYearByCompanyId(
      companyId,
      year
    );
  };

  static getLastStockPriceByCompanyId = (companyId: string) => {
    return StockPriceDAO.getLastStockPriceByCompanyId(companyId);
  };

  static deleteById = (shareId: string) => {
    return StockPriceDAO.deleteById(shareId);
  };
}
