import sendIpcSql from "message-control/renderer";
import moment from "moment";
import { IExchangeRateForm } from "types/exchange-rate";
import { deleteById } from "./operations";

export default class ExchangeRateDAO {
  static add = (exchangeRate: IExchangeRateForm) => {
    //Call the DB
    const sql = `
    INSERT INTO "exchanges"
    (
        "transactionDate"
      , "exchangeValue"
      , "exchangeName"
      , "creationDate"
      , "lastUpdateDate"
      )
    VALUES (
        '${exchangeRate.transactionDate}',
      ,  '${exchangeRate.exchangeValue}'
      , '${exchangeRate.exchangeName}'
      , '${moment(new Date())}'
      , '${moment(new Date())}'
      );
    `;
    const results = sendIpcSql(sql, "insert");
    return results;
  };

  static deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("exchanges", id);
    return results;
  };

  static get = (transactionDate: string, exchangeName: string) => {
    const sql = `
    SELECT * FROM "exchanges"
    WHERE transactionDate = '${transactionDate}' AND exchangeName='${exchangeName}'`;
    console.log(sql);
    const results = sendIpcSql(sql, "get");
    return results;
  };

  static getAll = () => {
    //Call the DB
    const sql = `
    SELECT * FROM exchanges
    `;
    const results = sendIpcSql(sql);
    return results;
  };
}
