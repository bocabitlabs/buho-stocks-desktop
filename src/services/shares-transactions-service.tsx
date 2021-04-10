import { SharesTransaction, SharesTransactionFormProps } from "types/shares-transaction";
import { IAddProps } from "types/common";
import SharesTransactionsDAO from "database/daos/shares-transaction-dao/shares-transactions-dao";

export default class SharesTransactionsService {
  static create = (transaction: SharesTransactionFormProps): IAddProps => {
    return SharesTransactionsDAO.create(transaction);
  };

  static deleteById = (transactionId: string) => {
    return SharesTransactionsDAO.deleteById(transactionId);
  };

  static exportAll = (): SharesTransaction[] => {
    const results = SharesTransactionsDAO.exportAll();
    return results;
  };

  static getAll = (companyId: string) => {
    return SharesTransactionsDAO.getAll(companyId);
  };

  static getById = (transactionId: string) => {
    return SharesTransactionsDAO.getById(transactionId);
  };

  static update = (
    transactionId: string,
    transaction: SharesTransactionFormProps
  ) => {
    return SharesTransactionsDAO.update(transactionId, transaction);
  };
}
