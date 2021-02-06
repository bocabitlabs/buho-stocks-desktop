import { DividendsTransactionFormProps } from "types/dividends-transaction";
import DividendDAO from "../database/daos/dividends-transactions-dao";

export default class DividendsTransactionsService {
  static add = (dividend: DividendsTransactionFormProps) => {
    return DividendDAO.add(dividend);
  };

  static getAll = (companyId: string) => {
    return DividendDAO.getAll(companyId);
  };

  static getDividendsTransactionsByCompanyId = (companyId: string) => {
    return DividendDAO.getByCompanyId(companyId);
  };

  static deleteById = (shareId: string) => {
    return DividendDAO.deleteById(shareId);
  };
}
