import sendIpcSql from "../../message-control/renderer";
import { StockPriceItemProps } from "../../types/stock-price";
import { deleteById } from "./operations";

export default class StockPriceDAO {
  add = (stockPrice: StockPriceItemProps) => {
    //Call the DB
    const sql = `
    INSERT INTO stockPrices
    (
      "priceShare"
      , "operationDate"
      , "companyId"
    )
    VALUES
    (
        '${stockPrice.priceShare}'
      , '${stockPrice.operationDate}'
      , '${stockPrice.companyId}'
    );
    `;

    const results = sendIpcSql(sql, "insert");
    return results;
  };

  getStockPrices = (companyId: string) => {
    //Call the DB
    console.log("Get all price stock");
    const sql = `
    SELECT *
    FROM stockPrices
    WHERE companyId = '${companyId}'
    ORDER BY strftime(stockPrices.operationDate) DESC
    ;
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  getLastStockPricePerYearByCompanyId = (companyId: string, year: string) => {
    const sql = `
    SELECT *
    FROM stockPrices
    WHERE companyId = '${companyId}' AND strftime('%Y', stockPrices.operationDate) = '${year}'
    ORDER BY strftime(stockPrices.operationDate) DESC
    LIMIT 1;
      `;
    const results = sendIpcSql(sql);
    console.log(results);
    return results;
  };

  deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("stockPrices", id);
    return results;
  };
}
