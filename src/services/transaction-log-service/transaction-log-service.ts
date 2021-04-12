import TransactionLogDAO from "database/daos/transaction-log-dao/transaction-log-dao";
import { ITransactionLogMessageFormProps } from "types/transaction-log";

export default class TransactionLogService {
  static create = (element: ITransactionLogMessageFormProps) => {
    return TransactionLogDAO.create(element);
  };

  static getAll = (portfolioId: string) => {
    return TransactionLogDAO.getAll(portfolioId);
  };

  static deleteById = (elementId: string) => {
    return TransactionLogDAO.deleteById(elementId);
  };
}
