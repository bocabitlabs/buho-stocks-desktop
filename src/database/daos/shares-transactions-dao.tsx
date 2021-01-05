import { SharesTransactionFormProps } from "types/shares-transaction";
import sendIpcSql from "../../message-control/renderer";
import { deleteById } from "./operations";

export default class SharesTransactionsDAO {
  addSharesTransaction = (sharesTransaction: SharesTransactionFormProps) => {
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
    );
    `;

    const results = sendIpcSql(sql, "insert");
    return results;
  };

  getSharesTransactions = (companyId: string) => {
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

  getSharesTransactionsPerYearByCompanyId = (companyId: string) => {
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
    console.log(results);
    return results;
  };

  deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("sharesTransactions", id);
    return results;
  };
}