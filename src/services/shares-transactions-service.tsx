import { SharesTransaction, SharesTransactionFormProps } from "types/shares-transaction";
import SharesTransactionsDAO from "database/daos/shares-transactions-dao";
import { IAddProps } from "types/common";

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
