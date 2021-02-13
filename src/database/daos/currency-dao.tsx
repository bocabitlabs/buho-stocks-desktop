import sendIpcSql from "message-control/renderer";
import moment from "moment";
import { CurrencyFormFields } from "types/currency";
import { deleteById } from "./operations";

export default class CurrencyDAO {
  static addCurrency = (currency: CurrencyFormFields) => {
    //Call the DB
    const sql = `
    INSERT INTO "currencies"
    (
    "name"
    , "abbreviation"
    , "symbol"
    , "country"
    , "color"
    , "creation_date"
    , "last_update_date"
    )
    VALUES (
        '${currency.name}'
      , '${currency.abbreviation}'
      , '${currency.symbol}'
      , '${currency.country}'
      , '${currency.color}'
      , '${moment(new Date())}'
      , '${moment(new Date())}'
      );
    `;

    const result = sendIpcSql(sql, "insert");
    return result;
  };
  static getCurrencies = () => {
    //Call the DB
    console.log("Get all currencies");
    const sql = `
    SELECT * FROM currencies
    `;

    const currencies = sendIpcSql(sql);
    return currencies;
  };
  static deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("currencies", id);
    return results;
  };
}
