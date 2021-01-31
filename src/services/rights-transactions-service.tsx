import RightsTransactionsDAO from "database/daos/rights-transactions-dao";
import { RightsTransactionFormProps } from "types/rights-transaction";

export default class RightsTransactionsService {
  static addRightsTransaction = (transaction: RightsTransactionFormProps) => {
    return new RightsTransactionsDAO().addRightsTransaction(transaction);
  };

  static getRightsTransactions = (companyId: string) => {
    return new RightsTransactionsDAO().getRightsTransactions(companyId);
  };

  static deleteById = (shareId: string) => {
    return new RightsTransactionsDAO().deleteById(shareId);
  };
}
