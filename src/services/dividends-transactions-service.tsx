import { DividendsTransactionFormProps } from "types/dividends-transaction";
import DividendDAO from "../database/daos/dividends-transactions-dao";

export default class DividendsTransactionsService {
  addDividendsTransaction = (dividend: DividendsTransactionFormProps) => {
    return new DividendDAO().addDividendsTransaction(dividend);
  };

  getAll = (companyId: string) => {
    return new DividendDAO().getDividendsTransactions(companyId);
  };

  getDividendsTransactionsPerYearByCompanyId = (companyId: string) => {
    return new DividendDAO().getDividendsTransactionsPerYearByCompanyId(companyId);
  };

  getDividendsTransactionsByCompanyId = (companyId: string) => {
    return new DividendDAO().getDividendsTransactionsByCompanyId(companyId);
  }

  deleteById = (shareId: string) => {
    return new DividendDAO().deleteById(shareId);
  };
}
