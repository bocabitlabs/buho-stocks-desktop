import TransactionLogDAO from "database/daos/transaction-log-dao";
import { ITransactionLogMessageFormProps } from "types/transaction-log";

export default class TransactionLogService {
  static add = (element: ITransactionLogMessageFormProps) => {
    return TransactionLogDAO.add(element);
  };

  static getAll = (portfolioId: string) => {
    return TransactionLogDAO.getAll(portfolioId);
  };

  static deleteById = (elementId: string) => {
    return TransactionLogDAO.deleteById(elementId);
  };
}
