import moment from "moment";
import { RightsTransaction, RightsTransactionFormProps } from "types/rights-transaction";
import sendIpcSql from "../../message-control/renderer";
import { deleteById } from "./operations";

export default class RightsTransactionsDAO {
  static create = (rightsTransaction: RightsTransactionFormProps) => {
    const sql = `
    INSERT INTO "rightsTransactions"
    (
        "count"
      , "price"
      , "commission"
      , "shares"
      , "type"
      , "exchangeRate"
      , "notes"
      , "transactionDate"
      , "companyId"
      , "color"
      , "creationDate"
      , "lastUpdateDate"
    )
    VALUES
    (
        '${rightsTransaction.count}'
      , '${rightsTransaction.price}'
      , '${rightsTransaction.commission}'
      , '${rightsTransaction.shares}'
      , '${rightsTransaction.type}'
      , '${rightsTransaction.exchangeRate}'
      , '${rightsTransaction.notes}'
      , '${rightsTransaction.transactionDate}'
      , '${rightsTransaction.companyId}'
      , '${rightsTransaction.color}'
      , '${moment(new Date())}'
      , '${moment(new Date())}'
    );
    `;
    console.log(sql);
    const results = sendIpcSql(sql, "insert");
    console.log(results);
    return results;
  };

  static getById = (transactionId: string): RightsTransaction => {
    //Call the DB
    const sql = `
    SELECT *
    FROM "rightsTransactions"
    WHERE rightsTransactions.id = '${transactionId}';
    `;
    const results = sendIpcSql(sql, "get");
    return results;
  };

  static getAll = (companyId: string) => {
    //Call the DB
    console.log("Get all rights");
    const sql = `
    SELECT
    rightsTransactions.*
      , currencies.symbol as currencySymbol
      , currencies.name as currencyName
    FROM  rightsTransactions
    LEFT JOIN "companies"
      ON companies.id = rightsTransactions.companyId
    LEFT JOIN "currencies"
      ON currencies.id = companies.currencyId
    WHERE rightsTransactions.companyId = '${companyId}';
    `;

    const results = sendIpcSql(sql);
    console.log(results)
    return results;
  };

  static deleteById = (transactionId: string) => {
    //Call the DB
    const results = deleteById("rightsTransactions", transactionId);
    return results;
  };

  static update = (
    transactionId: string,
    transaction: RightsTransactionFormProps
  ) => {
    const sql = `
    UPDATE rightsTransactions
    SET
    count = '${transaction.count}'
    , price = '${transaction.price}'
    , commission = '${transaction.commission}'
    , shares = '${transaction.shares}'
    , type = '${transaction.type}'
    , exchangeRate = '${transaction.exchangeRate}'
    , notes = '${transaction.notes}'
    , transactionDate = '${transaction.transactionDate}'
    , companyId = '${transaction.companyId}'
    , color = '${transaction.color}'
    , lastUpdateDate = '${moment(new Date())}'
    WHERE rightsTransactions.id = '${transactionId}';
    `;
    const results = sendIpcSql(sql, "update");
    return results;
  };
}
