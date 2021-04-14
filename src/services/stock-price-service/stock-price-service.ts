import StockPriceDAO from "database/daos/stock-price-dao/stock-price-dao";
import moment from "moment";
import { IStockPrice, StockPriceFormProps } from "types/stock-price";
import { delay } from "utils/misc";
import { getCurrentData, getHistoricalPrices } from "yahoo-stock-prices-fetch";

export default class StockPriceService {
  static create = (stockPrice: StockPriceFormProps) => {
    return StockPriceDAO.create(stockPrice);
  };

  static exportAll = (): IStockPrice[] => {
    const results = StockPriceDAO.exportAll();
    return results;
  };

  static getAll = (companyId: string) => {
    return StockPriceDAO.getAll(companyId);
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
            console.error("error" + error);
          }
        })
      );
    }
    return { found, data };
  };

  static getHistoricStockPriceFromAPI = async (
    transactionDate: string,
    exchangeName: string
  ) => {
    let data: any = undefined;
    let found = false;
    const momentDate = moment(transactionDate, "DD-MM-YYYY");
    try {
      delay(2000);
      data = await getHistoricalPrices(
        +momentDate.month(),
        +momentDate.format("DD"),
        +momentDate.year(),
        +momentDate.month(),
        +momentDate.format("DD"),
        +momentDate.year(),
        exchangeName,
        "1wk"
      );
    } catch (error) {
      console.warn(
        `Unable to get the historical price for ${exchangeName} (${transactionDate})`
      );
      found = false;
    }
    if (data && data.length > 0) {
      found = true;
      return { found, data: data[0] };
    }

    return { found, data: undefined };
  };

  static getHistoricStockPriceFromAPIStartEnd = async (
    transactionDate: string,
    endDate: string,
    exchangeName: string
  ) => {
    let data: any = undefined;
    let found = false;
    const momentDate = moment(transactionDate, "DD-MM-YYYY");
    const momentEndDate = moment(endDate, "DD-MM-YYYY");
    try {
      delay(2000);
      data = await getHistoricalPrices(
        +momentDate.month(),
        +momentDate.format("DD"),
        +momentDate.year(),
        +momentEndDate.month(),
        +momentEndDate.format("DD"),
        +momentEndDate.year(),
        exchangeName,
        "1wk"
      );
    } catch (error) {
      console.warn(
        `Unable to get the historical price for ${exchangeName} (${transactionDate})`
      );
      found = false;
    }
    if (data && data.length > 0) {
      found = true;
      return { found, data: data[0] };
    }

    return { found, data: undefined };
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
