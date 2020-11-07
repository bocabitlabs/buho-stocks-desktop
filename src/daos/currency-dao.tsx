import sendSql from "../message-control/renderer";
import { CurrencyItemProps } from "../types/currency";

export function addCurrency(currency: CurrencyItemProps, callback: Function) {
  //Call the DB
  const sql = `INSERT INTO "currencies"
  ("name", "abbreviation", "symbol", "country")
  VALUES ('${currency.name}', '${currency.abbreviation}', '${currency.symbol}', '${currency.country}');`;

  const results = sendSql(sql, "insert");
  console.log(results);

  callback(results);

  return sql;
}

export const getCurrencies = async (callback: Function) => {
  //Call the DB
  console.log("Get all currencies");
  const sql = `SELECT * FROM currencies`;
  const results = sendSql(sql);
  console.log(results);

  callback(results);
};
