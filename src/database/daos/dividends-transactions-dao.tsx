import sendIpcSql from "message-control/renderer";
import { DividendsTransactionFormProps } from "types/dividends-transaction";
import { deleteById } from "./operations";

export default class DividendsTransactionsDAO {
  static add = (dividend: DividendsTransactionFormProps) => {
    //Call the DB
    const sql = `
    INSERT INTO "dividendsTransactions"
    (
       "count"
      ,"price"
      ,"commission"
      ,"exchangeRate"
      ,"notes"
      ,"transactionDate"
      ,"companyId"
      ,"color"
    )
    VALUES
    (
       '${dividend.count}'
     , '${dividend.price}'
     , '${dividend.commission}'
     , '${dividend.exchangeRate}'
     , '${dividend.notes}'
     , '${dividend.transactionDate}'
     , '${dividend.companyId}'
     , '${dividend.color}'
    );
    `;

    const results = sendIpcSql(sql, "insert");
    return results;
  };

  static getAll = (companyId: string) => {
    //Call the DB
    console.log("Get all dividends");
    const sql = `
    SELECT
      dividendsTransactions.*
      , currencies.symbol as currencySymbol
      , currencies.name as currencyName
    FROM  dividendsTransactions
    LEFT JOIN "companies"
      ON companies.id = dividendsTransactions.companyId
    LEFT JOIN "currencies"
      ON currencies.id = companies.currencyId
    WHERE dividendsTransactions.companyId = '${companyId}';
    `;

    const results = sendIpcSql(sql);
    return results;
  };

  static getByCompanyId = (companyId: string) => {
    const sql = `
      SELECT
      sum(dividendsTransactions.price * dividendsTransactions.count - dividendsTransactions.commission) as dividendsNet
      , sum((dividendsTransactions.price * dividendsTransactions.count - dividendsTransactions.commission) * dividendsTransactions.exchangeRate) as dividendsNetBaseCurrency
      , sum(dividendsTransactions.price * dividendsTransactions.count) as dividendsGross
      , sum(dividendsTransactions.price * dividendsTransactions.count * dividendsTransactions.exchangeRate) as dividendsGrossBaseCurrency
	  FROM dividendsTransactions
    WHERE dividends.companyId = '${companyId}';
      `;
    const results = sendIpcSql(sql, "get");
    return results;
  };

  static deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("dividendsTransactions", id);
    return results;
  };
}
