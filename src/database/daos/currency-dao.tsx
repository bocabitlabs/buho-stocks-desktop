import sendIpcSql from "message-control/renderer";
import moment from "moment";
import { CurrencyFormFields } from "types/currency";
import { deleteById, getById } from "./operations";

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
    , "creationDate"
    , "lastUpdateDate"
    )
    VALUES (
        '${currency.name}'
      , '${currency.abbreviation}'
      , '${currency.symbol}'
      , '${currency.country}'
      , '${currency.color}'
      , '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
      , '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
      );
    `;

    const result = sendIpcSql(sql, "insert");
    return result;
  };

  static exportAll = () => {
    //Call the DB
    console.debug("Export all currencies");
    const sql = `
    SELECT name, color, abbreviation, symbol, country
    FROM "currencies";
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  static getByName = (name: string) => {
    const sql = `SELECT * FROM "currencies" WHERE "name" = '${name}'`;
    const result = sendIpcSql(sql, "get");
    return result;
  };

  static getCurrencies = () => {
    //Call the DB
    const sql = `
    SELECT * FROM currencies
    ORDER BY name ASC
    `;

    const currencies = sendIpcSql(sql);
    return currencies;
  };
  static getById = (id: string) => {
    //Call the DB
    const results = getById("currencies", id);
    return results;
  };

  static deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("currencies", id);
    return results;
  };
  static update = (id: string, currency: CurrencyFormFields) => {
    const sql = `
    UPDATE currencies
    SET
    name = '${currency.name}'
    , abbreviation = '${currency.abbreviation}'
    , country = '${currency.country}'
    , color = '${currency.color}'
    , symbol = '${currency.symbol}'
    , lastUpdateDate = '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
    WHERE currencies.id = '${id}';
    `;
    const results = sendIpcSql(sql, "update");
    return results;
  };
}
