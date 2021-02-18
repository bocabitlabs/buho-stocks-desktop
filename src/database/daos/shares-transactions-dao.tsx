import sendIpcSql from "message-control/renderer";
import moment from "moment";
import {
  SharesTransaction,
  SharesTransactionFormProps
} from "types/shares-transaction";
import { deleteById } from "./operations";

export default class SharesTransactionsDAO {
  static create = (sharesTransaction: SharesTransactionFormProps) => {
    //Call the DB
    const sql = `
    INSERT INTO "sharesTransactions"
    (
        "count"
      , "price"
      , "commission"
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
        '${sharesTransaction.count}'
      , '${sharesTransaction.price}'
      , '${sharesTransaction.commission}'
      , '${sharesTransaction.type}'
      , '${sharesTransaction.exchangeRate}'
      , '${sharesTransaction.notes}'
      , '${sharesTransaction.transactionDate}'
      , '${sharesTransaction.companyId}'
      , '${sharesTransaction.color}'
      , '${moment(new Date())}'
      , '${moment(new Date())}'
    );
    `;
    const results = sendIpcSql(sql, "insert");
    return results;
  };

  static exportAll = () => {
    //Call the DB
    console.log("Export all shares transactions");
    const sql = `
    SELECT
      sharesTransactions.count as count
      , sharesTransactions.price as price
      , sharesTransactions.commission as commission
      , sharesTransactions.color as color
      , sharesTransactions.transactionDate as transactionDate
      , sharesTransactions.exchangeRate as exchangeRate
      , sharesTransactions.notes as notes
      , sharesTransactions.type as type
      , currencies.symbol as currencySymbol
      , currencies.name as currencyName
      , companies.name as companyName
    FROM "sharesTransactions"
    LEFT JOIN "companies"
      ON companies.id = sharesTransactions.companyId
    LEFT JOIN "currencies"
      ON currencies.id = companies.currencyId
    ;
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  static getById = (transactionId: string): SharesTransaction => {
    //Call the DB
    const sql = `
    SELECT *
    FROM "sharesTransactions"
    WHERE sharesTransactions.id = '${transactionId}';
    `;
    const results = sendIpcSql(sql, "get");
    return results;
  };

  static getAll = (companyId: string) => {
    //Call the DB
    console.log("Get all shares");
    const sql = `
    SELECT
    sharesTransactions.*
      , currencies.symbol as currencySymbol
      , currencies.name as currencyName
    FROM  sharesTransactions
    LEFT JOIN "companies"
      ON companies.id = sharesTransactions.companyId
    LEFT JOIN "currencies"
      ON currencies.id = companies.currencyId
    WHERE sharesTransactions.companyId = '${companyId}';
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  static getSharesTransactionsPerYearByCompanyId = (companyId: string) => {
    const sql = `
    SELECT
      strftime('%Y', transactionDate) as 'year'
      , companyId
      , sum(CASE WHEN sharesTransactions.type='BUY' THEN sharesTransactions.count ELSE 0 END) as sharesBought
      , sum(CASE WHEN sharesTransactions.type='SELL' THEN sharesTransactions.count ELSE 0 END) as sharesSold
      , sum(CASE WHEN sharesTransactions.type='BUY' THEN sharesTransactions.price * sharesTransactions.count ELSE 0 END) as investedAmount
      , sum(CASE WHEN sharesTransactions.type='BUY' THEN sharesTransactions.price * sharesTransactions.count ELSE 0 END * exchangeRate) as investedAmountBaseCurrency
      , sum(CASE WHEN sharesTransactions.type='SELL' THEN sharesTransactions.price * sharesTransactions.count ELSE 0 END) as soldAmount
      , sum(CASE WHEN sharesTransactions.type='SELL' THEN sharesTransactions.price * sharesTransactions.count ELSE 0 END * exchangeRate) as soldAmountBaseCurrency
      , sum(CASE WHEN sharesTransactions.type='BUY' THEN sharesTransactions.commission ELSE 0 END) as investmentCommission
      , sum(CASE WHEN sharesTransactions.type='SELL' THEN sharesTransactions.commission ELSE 0 END) as sellCommission
      , count(price) as transactionsCount
      FROM  sharesTransactions
      WHERE sharesTransactions.companyId = '${companyId}'
      GROUP BY strftime('%Y', transactionDate)
      ORDER BY strftime('%Y', transactionDate)
      ;
      `;
    const results = sendIpcSql(sql);
    return results;
  };

  static deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("sharesTransactions", id);
    return results;
  };

  static update = (
    transactionId: string,
    transaction: SharesTransactionFormProps
  ) => {
    const sql = `
    UPDATE sharesTransactions
    SET
    count = '${transaction.count}'
    , price = '${transaction.price}'
    , commission = '${transaction.commission}'
    , exchangeRate = '${transaction.exchangeRate}'
    , notes = '${transaction.notes}'
    , transactionDate = '${transaction.transactionDate}'
    , companyId = '${transaction.companyId}'
    , color = '${transaction.color}'
    , type = '${transaction.type}'
    , lastUpdateDate = '${moment(new Date())}'
    WHERE sharesTransactions.id = '${transactionId}';
    `;
    const results = sendIpcSql(sql, "update");
    return results;
  };
}
