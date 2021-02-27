import sendIpcSql from "message-control/renderer";
import moment from "moment";
import { ITransactionLogMessageFormProps } from "types/transaction-log";
import { deleteById } from "./operations";

export default class TransactionLogDAO {
  static add = (element: ITransactionLogMessageFormProps) => {
    //Call the DB
    const sql = `
    INSERT INTO transactionsLog
    (
      "type"
      , "message"
      , "portfolioId"
      , "creationDate"
      , "lastUpdateDate"
    )
    VALUES
    (
        '${element.type}'
      , '${element.message}'
      , '${element.portfolioId}'
      , '${moment(new Date())}'
      , '${moment(new Date())}'
    );
    `;

    const results = sendIpcSql(sql, "insert");
    return results;
  };

  static getAll = (portfolioId: string) => {
    //Call the DB
    console.log("Get all logs");
    const sql = `
    SELECT *
    FROM transactionsLog
    WHERE portfolioId = '${portfolioId}'
    ORDER BY strftime(transactionsLog.creationDate) DESC
    ;
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  static deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("transactionsLog", id);
    return results;
  };
}