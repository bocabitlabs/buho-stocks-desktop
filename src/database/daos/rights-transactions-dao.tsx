import { RightsTransactionFormProps } from "types/rights-transaction";
import sendIpcSql from "../../message-control/renderer";
import { deleteById } from "./operations";

export default class RightsTransactionsDAO {
  addRightsTransaction = (rightsTransaction: RightsTransactionFormProps) => {
    const sql = ``;

    const results = sendIpcSql(sql, "insert");
    return results;
  };

  getRightsTransactions = (companyId: string) => {
    //Call the DB
    console.log("Get all shares");
    const sql = ``;

    const results = sendIpcSql(sql);
    return results;
  };

  getRightsTransactionsPerYearByCompanyId = (companyId: string) => {
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
