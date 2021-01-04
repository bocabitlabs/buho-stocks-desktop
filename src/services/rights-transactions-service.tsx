import RightsTransactionsDAO from "database/daos/rights-transactions-dao";
import { RightsTransactionFormProps } from "types/rights-transaction";

export default class RightsTransactionsService {
  static addRightsTransaction = (share: RightsTransactionFormProps) => {
    return new RightsTransactionsDAO().addRightsTransaction(share);
  };

  static getRights = (companyId: string) => {
    return new RightsTransactionsDAO().getRightsTransactions(companyId);
  };

  static getRightsTransactionsPerYearByCompanyId = (companyId: string) => {
    return new RightsTransactionsDAO().getRightsTransactionsPerYearByCompanyId(
      companyId
    );
  };

  static deleteById = (shareId: string) => {
    return new RightsTransactionsDAO().deleteById(shareId);
  };
}
