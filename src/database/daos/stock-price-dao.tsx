import sendIpcSql from "message-control/renderer";
import moment from "moment";
import { StockPriceFormProps } from "types/stock-price";
import { deleteById } from "./operations/operations";

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
      , '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
      , '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
    );
    `;

    const results = sendIpcSql(sql, "insert");
    return results;
  };

  static exportAll = () => {
    //Call the DB
    console.debug("Export all stock prices");
    const sql = `
    SELECT
      stockPrices.price as price
      , stockPrices.exchangeRate as exchangeRate
      , stockPrices.transactionDate as transactionDate
      , companies.ticker as ticker
      , portfolios.name as portfolioName
    FROM "stockPrices"
    LEFT JOIN "companies"
      ON companies.id = stockPrices.companyId
    LEFT JOIN "portfolios"
      ON portfolios.id = companies.portfolioId
    ;
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  static getStockPrices = (companyId: string) => {
    //Call the DB
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
    return results;
  };

  static deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("stockPrices", id);
    return results;
  };
}
