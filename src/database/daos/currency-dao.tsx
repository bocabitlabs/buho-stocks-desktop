import sendIpcSql from "../../message-control/renderer";
import { CurrencyItemProps } from "../../types/currency";

export default class CurrencyDAO {
  addCurrency = (currency: CurrencyItemProps) => {
    //Call the DB
    const sql = `INSERT INTO "currencies"
    ("name", "abbreviation", "symbol", "country", "color")
    VALUES ('${currency.name}', '${currency.abbreviation}', '${currency.symbol}', '${currency.country}', '${currency.color}');`;
    const result = sendIpcSql(sql, "insert");
    console.log(result);
    return result;
  };
  getCurrencies = () => {
    //Call the DB
    console.log("Get all currencies");
    const sql = `SELECT * FROM currencies`;
    const currencies = sendIpcSql(sql);
    console.log(currencies);
    return currencies;
  };
  deleteCurrencyById = (currencyId: string) => {
    //Call the DB
    console.log("Delete currency by ID");
    const sql = `DELETE FROM currencies WHERE "id" = '${currencyId}'`;
    const results = sendIpcSql(sql, "delete");
    console.log(results);
    return results;
  };
}
