import { getCurrenciesMessageReply, addCurrenciesMessageReply } from "../message-control/messages";
import { CurrencyItemProps } from "../types/currency";
import sendSqlWithCallback from "./send-sql";



export function addCurrency(currency: CurrencyItemProps, callback: Function) {
  //Call the DB
  const sql = `INSERT INTO "currencies"
  ("name", "abbreviation", "symbol", "country")
  VALUES ('${currency.name}', '${currency.abbreviation}', '${currency.symbol}', '${currency.country}');`;

  sendSqlWithCallback(sql, addCurrenciesMessageReply, callback, (error:string)=> console.log(error))

  return sql;
}

export const getCurrencies = async (callback: Function) => {
  //Call the DB
  console.log("Get all currencies")
  const sql = `SELECT * FROM currencies`;
  sendSqlWithCallback(sql, getCurrenciesMessageReply, callback, (error:string)=> console.log(error));
};
