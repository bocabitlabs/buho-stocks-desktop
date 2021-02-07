import RightsTransactionsDAO from "database/daos/rights-transactions-dao";
import { RightsTransactionFormProps } from "types/rights-transaction";

export default class RightsTransactionsService {
  static create = (transaction: RightsTransactionFormProps) => {
    return RightsTransactionsDAO.create(transaction);
  };

  static getAll = (companyId: string) => {
    return RightsTransactionsDAO.getAll(companyId);
  };

  static deleteById = (shareId: string) => {
    return RightsTransactionsDAO.deleteById(shareId);
  };

  static getById = (transactionId: string) => {
    return RightsTransactionsDAO.getById(transactionId);
  };

  static update = (
    transactionId: string,
    transaction: RightsTransactionFormProps
  ) => {
    return RightsTransactionsDAO.update(transactionId, transaction);
  };
}
