import { RightsTransactionFormProps } from "types/rights-transaction";
import sendIpcSql from "../../message-control/renderer";
import { deleteById } from "./operations";

export default class RightsTransactionsDAO {
  addRightsTransaction = (rightsTransaction: RightsTransactionFormProps) => {
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
    );
    `;
    console.log(sql);
    const results = sendIpcSql(sql, "insert");
    console.log(results);
    return results;
  };

  getRightsTransactions = (companyId: string) => {
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

  deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("rightsTransactions", id);
    return results;
  };
}
