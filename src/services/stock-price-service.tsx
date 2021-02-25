import StockPriceDAO from "database/daos/stock-price-dao";
import { IStockPrice, StockPriceFormProps } from "types/stock-price";
import { delay } from "utils/misc";
import { getCurrentData } from "yahoo-stock-prices-fetch";

export default class StockPriceService {
  static add = (stockPrice: StockPriceFormProps) => {
    return StockPriceDAO.add(stockPrice);
  };

  static exportAll = (): IStockPrice[] => {
    const results = StockPriceDAO.exportAll();
    return results;
  };

  static getStockPrices = (companyId: string) => {
    return StockPriceDAO.getStockPrices(companyId);
  };

  static getStockPriceAPI = async (
    ticker: string,
    alternativeTickers: string
  ) => {
    let found = false;
    let data: any = undefined;
    try {
      delay(1000);
      data = await getCurrentData(ticker);
      found = true;
    } catch (error) {
      console.log(alternativeTickers);
      const companyTickersArray = alternativeTickers
        .replace(" ", "")
        .split(",");
      await Promise.all(
        companyTickersArray.map(async (element) => {
          try {
            if (found) {
              return;
            }
            delay(1000);
            data = await getCurrentData(element);
            found = true;
          } catch (error) {
            console.log("error" + error);
          }
        })
      );
    }
    return {found, data};
  };

  static getLastStockPricePerYearByCompanyId = (
    companyId: string,
    year: string
  ) => {
    return StockPriceDAO.getLastStockPricePerYearByCompanyId(companyId, year);
  };

  static getLastStockPriceByCompanyId = (companyId: string) => {
    return StockPriceDAO.getLastStockPriceByCompanyId(companyId);
  };

  static deleteById = (shareId: string) => {
    return StockPriceDAO.deleteById(shareId);
  };
}
