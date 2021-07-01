import moment from "moment";
import { delay } from "utils/misc";
import { getHistoricalPrices } from "yahoo-stock-prices-fetch";

export default class ExchangeRatesAPIClient {
  static getHistoricalPrice = async (
    transactionDate: string,
    exchangeName: string
  ) => {
    let data: any = undefined;
    const momentDate = moment(transactionDate, "DD-MM-YYYY");
    try {
      delay(1000);
      data = await getHistoricalPrices(
        +momentDate.month(),
        +momentDate.format("DD"),
        +momentDate.year(),
        +momentDate.month(),
        +momentDate.format("DD"),
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

  static getHistoricalPriceWeekly = async (
    transactionDate: string,
    endDate: string,
    exchangeName: string
  ) => {
    let data: any = undefined;
    const momentDate = moment(transactionDate, "DD-MM-YYYY");
    const momentEndDate = moment(endDate, "DD-MM-YYYY");
    try {
      delay(1000);
      data = await getHistoricalPrices(
        +momentDate.month(),
        +momentDate.format("DD"),
        +momentDate.year(),
        +momentEndDate.month(),
        +momentEndDate.format("DD"),
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
}
