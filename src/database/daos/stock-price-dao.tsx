import sendIpcSql from "../../message-control/renderer";
import { StockPriceItemProps } from "../../types/stock-price";
import { deleteById } from "./operations";

export default class StockPriceDAO {
  static add = (stockPrice: StockPriceItemProps) => {
    //Call the DB
    const sql = `
    INSERT INTO stockPrices
    (
      "priceShare"
      , "transactionDate"
      , "companyId"
    )
    VALUES
    (
        '${stockPrice.priceShare}'
      , '${stockPrice.transactionDate}'
      , '${stockPrice.companyId}'
    );
    `;

    const results = sendIpcSql(sql, "insert");
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

  static getLastStockPricePerYearByCompanyId = (companyId: string, year: string) => {
    const sql = `
    SELECT *
    FROM stockPrices
    WHERE companyId = '${companyId}' AND strftime('%Y', stockPrices.transactionDate) = '${year}'
    ORDER BY strftime(stockPrices.transactionDate) DESC
    LIMIT 1;
      `;
    const results = sendIpcSql(sql, 'get');
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
    const results = sendIpcSql(sql, 'get');
    console.log(results);
    return results;
  };

  static deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("stockPrices", id);
    return results;
  };
}
