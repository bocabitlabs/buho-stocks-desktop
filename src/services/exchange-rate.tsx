import ExchangeRateDAO from "database/daos/exchange-rate";
import moment from "moment";
import { IExchangeRateForm } from "types/exchange-rate";
import { delay } from "utils/misc";
import { getHistoricalPrices } from "yahoo-stock-prices-fetch";

export default class ExchangeRateService {
  static add = (item: IExchangeRateForm) => {
    return ExchangeRateDAO.add(item);
  };

  static getAll = () => {
    return ExchangeRateDAO.getAll();
  };

  static get = (transactionDate: string, exchangeName: string) => {
    return ExchangeRateDAO.get(transactionDate, exchangeName);
  };

  static getFromAPI = async (transactionDate: string, exchangeName: string) => {
    let data: any = undefined;
    const momentDate = moment(transactionDate, "DD-MM-YYYY");
    try {
      delay(1000);
      data = await getHistoricalPrices(
        +momentDate.month(),
        +momentDate.format('DD'),
        +momentDate.year(),
        +momentDate.month(),
        +momentDate.format('DD'),
        +momentDate.year(),
        exchangeName + "=X",
        "1d"
      );
    } catch (error) {
      console.warn(
        `Unable to get the historical price for ${exchangeName} (${transactionDate})`
      );
    }
    if (data.length > 0) {
      return data[0];
    }

    return undefined;
  };

  static getFromAPIWeekly = async (transactionDate: string, endDate: string, exchangeName: string) => {
    let data: any = undefined;
    const momentDate = moment(transactionDate, "DD-MM-YYYY");
    const momentEndDate = moment(endDate, "DD-MM-YYYY");
    try {
      delay(1000);
      data = await getHistoricalPrices(
        +momentDate.month(),
        +momentDate.format('DD'),
        +momentDate.year(),
        +momentEndDate.month(),
        +momentEndDate.format('DD'),
        +momentEndDate.year(),
        exchangeName + "=X",
        "1wk"
      );
    } catch (error) {
      console.warn(
        `Unable to get the historical price for ${exchangeName} (${transactionDate})`
      );
    }
    if (data.length > 0) {
      return data[0];
    }

    return undefined;
  };

  static deleteById = (itemId: string) => {
    return ExchangeRateDAO.deleteById(itemId);
  };
}
