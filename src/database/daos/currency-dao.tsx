import sendIpcSql from "../../message-control/renderer";
import { CurrencyItemProps } from "../../types/currency";
import { deleteById } from "./operations";

export default class CurrencyDAO {
  addCurrency = (currency: CurrencyItemProps) => {
    //Call the DB
    const sql = `
    INSERT INTO "currencies"
    (
    "name"
    , "abbreviation"
    , "symbol"
    , "country"
    , "color"
    )
    VALUES (
        '${currency.name}'
      , '${currency.abbreviation}'
      , '${currency.symbol}'
      , '${currency.country}'
      , '${currency.color}');
    `;

    const result = sendIpcSql(sql, "insert");
    return result;
  };
  getCurrencies = () => {
    //Call the DB
    console.log("Get all currencies");
    const sql = `
    SELECT * FROM currencies
    `;

    const currencies = sendIpcSql(sql);
    return currencies;
  };
  deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("currencies", id);
    return results;
  };
}
