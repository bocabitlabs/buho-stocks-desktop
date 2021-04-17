import { IDividendsTransaction, DividendsTransactionFormProps } from "types/dividends-transaction";
import DividendsTransactionsDAO from "database/daos/dividends-transactions-dao/dividends-transactions-dao";

export default class DividendsTransactionsService {
  static create = (transaction: DividendsTransactionFormProps) => {
    return DividendsTransactionsDAO.create(transaction);
  };

  static exportAll = (): IDividendsTransaction[] => {
    const results = DividendsTransactionsDAO.exportAll();
    return results;
  };

  static deleteById = (transactionId: string) => {
    return DividendsTransactionsDAO.deleteById(transactionId);
  };

  static getAll = (companyId: string) => {
    return DividendsTransactionsDAO.getAll(companyId);
  };

  static getById = (transactionId: string) => {
    return DividendsTransactionsDAO.getById(transactionId);
  };

  static update = (
    transactionId: string,
    transaction: DividendsTransactionFormProps
  ) => {
    return DividendsTransactionsDAO.update(transactionId, transaction);
  };
}
