import sendIpcSql from "../../message-control/renderer";
import { CurrencyItemProps } from "../../types/currency";

export default class CurrencyDAO {
  addCurrency = (currency: CurrencyItemProps, callback: Function) => {
    //Call the DB
    const sql = `INSERT INTO "currencies"
    ("name", "abbreviation", "symbol", "country")
    VALUES ('${currency.name}', '${currency.abbreviation}', '${currency.symbol}', '${currency.country}');`;

    const results = sendIpcSql(sql, "insert");
    console.log(results);

    callback(results);

    return sql;
  };
  getCurrencies = (callback: Function) => {
    //Call the DB
    console.log("Get all currencies");
    const sql = `SELECT * FROM currencies`;
    const results = sendIpcSql(sql);
    console.log(results);

    callback(results);
  };
}
