import sendIpcSql from "message-control/renderer";
import moment from "moment";
import { StockPriceFormProps } from "types/stock-price";
import { deleteById } from "./operations";

export default class StockPriceDAO {
  static add = (stockPrice: StockPriceFormProps) => {
    //Call the DB
    const sql = `
    INSERT INTO stockPrices
    (
      "price"
      , "transactionDate"
      , "companyId"
      , "exchangeRate"
      , "creationDate"
      , "lastUpdateDate"
    )
    VALUES
    (
        '${stockPrice.price}'
      , '${stockPrice.transactionDate}'
      , '${stockPrice.companyId}'
      , '${stockPrice.exchangeRate}'
      , '${moment(new Date())}'
      , '${moment(new Date())}'
    );
    `;

    const results = sendIpcSql(sql, "insert");
    return results;
  };

  static exportAll = () => {
    //Call the DB
    console.log("Export all stock prices");
    const sql = `
    SELECT *
    FROM "stockPrices";
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  static getStockPrices = (companyId: string) => {
    //Call the DB
    console.log("Get all price stock");
    const sql = `
    SELECT *
    FROM stockPrices
    WHERE companyId = '${companyId}'
    ORDER BY strftime(stockPrices.transactionDate) DESC
    ;
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  static getLastStockPricePerYearByCompanyId = (
    companyId: string,
    year: string
  ) => {
    const sql = `
    SELECT *
    FROM stockPrices
    WHERE companyId = '${companyId}' AND strftime('%Y', stockPrices.transactionDate) = '${year}'
    ORDER BY strftime(stockPrices.transactionDate) DESC
    LIMIT 1;
      `;
    const results = sendIpcSql(sql, "get");
    console.log(results);
    return results;
  };

  static getLastStockPriceByCompanyId = (companyId: string) => {
    const sql = `
    SELECT *
    FROM stockPrices
    WHERE companyId = '${companyId}'
    ORDER BY strftime(stockPrices.transactionDate) DESC
    LIMIT 1;
      `;
    const results = sendIpcSql(sql, "get");
    console.log(results);
    return results;
  };

  static deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("stockPrices", id);
    return results;
  };
}
