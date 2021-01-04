import { RightsTransactionFormProps } from "types/rights-transaction";
import sendIpcSql from "../../message-control/renderer";
import { deleteById } from "./operations";

export default class RightsTransactionsDAO {
  addRightsTransaction = (rightsTransaction: RightsTransactionFormProps) => {
    //Call the DB
    // const sql = `
    // INSERT INTO "sharesTransactions"
    // (
    //     "count"
    //   , "price"
    //   , "commission"
    //   , "type"
    //   , "exchangeRate"
    //   , "notes"
    //   , "transactionDate"
    //   , "companyId"
    //   , "color"
    // )
    // VALUES
    // (
    //     '${sharesTransaction.count}'
    //   , '${sharesTransaction.price}'
    //   , '${sharesTransaction.commission}'
    //   , '${sharesTransaction.type}'
    //   , '${sharesTransaction.exchangeRate}'
    //   , '${sharesTransaction.notes}'
    //   , '${sharesTransaction.transactionDate}'
    //   , '${sharesTransaction.companyId}'
    //   , '${sharesTransaction.color}'
    // );
    // `;
    const sql = ``;

    const results = sendIpcSql(sql, "insert");
    return results;
  };

  getRightsTransactions = (companyId: string) => {
    //Call the DB
    console.log("Get all shares");
    // const sql = `
    // SELECT
    //   shares.*
    //   , currencies.symbol as currencySymbol
    //   , currencies.name as currencyName
    // FROM  "shares"
    // LEFT JOIN "companies"
    //   ON companies.id = shares.companyId
    // LEFT JOIN "currencies"
    //   ON currencies.id = companies.currencyId
    // WHERE shares.companyId = '${companyId}';
    // `;
    const sql = ``;

    const results = sendIpcSql(sql);
    return results;
  };

  getRightsTransactionsPerYearByCompanyId = (companyId: string) => {
    // const sql = `
    // SELECT
    //   strftime('%Y', operationDate) as 'year'
    //   , companyId
    //   , sum(CASE WHEN shares.type='BUY' THEN shares.sharesNumber ELSE 0 END) as sharesBought
    //   , sum(CASE WHEN shares.type='SELL' THEN shares.sharesNumber ELSE 0 END) as sharesSold
    //   , sum(CASE WHEN shares.type='BUY' THEN shares.priceShare * shares.sharesNumber ELSE 0 END) as investedAmount
    //   , sum(CASE WHEN shares.type='BUY' THEN shares.priceShare * shares.sharesNumber ELSE 0 END * exchangeRate) as investedAmountBaseCurrency
    //   , sum(CASE WHEN shares.type='SELL' THEN shares.priceShare * shares.sharesNumber ELSE 0 END) as soldAmount
    //   , sum(CASE WHEN shares.type='SELL' THEN shares.priceShare * shares.sharesNumber ELSE 0 END * exchangeRate) as soldAmountBaseCurrency
    //   , sum(CASE WHEN shares.type='BUY' THEN shares.commission ELSE 0 END) as investmentCommission
    //   , sum(CASE WHEN shares.type='SELL' THEN shares.commission ELSE 0 END) as sellCommission
    //   , count(priceShare) as operationsCount
    //   FROM  "shares"
    //   WHERE shares.companyId = '${companyId}'
    //   GROUP BY strftime('%Y', operationDate)
    //   ORDER BY strftime('%Y', operationDate)
    //   ;
    //   `;
    const sql = ``;

    const results = sendIpcSql(sql);
    console.log(results);
    return results;
  };

  deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("rightsTransactions", id);
    return results;
  };
}
