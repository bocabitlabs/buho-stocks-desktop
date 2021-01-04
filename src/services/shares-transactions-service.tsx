import { SharesTransactionFormProps } from "types/shares-transaction";
import SharesTransactionsDAO from "../database/daos/shares-transactions-dao";

export default class SharesTransactionsService {
  addSharesTransaction = (share: SharesTransactionFormProps) => {
    return new SharesTransactionsDAO().addSharesTransaction(share);
  };

  getShares = (companyId: string) => {
    return new SharesTransactionsDAO().getSharesTransactions(companyId);
  };

  getSharesTransactionsPerYearByCompanyId = (companyId: string) => {
    return new SharesTransactionsDAO().getSharesTransactionsPerYearByCompanyId(
      companyId
    );
  };

  deleteById = (shareId: string) => {
    return new SharesTransactionsDAO().deleteById(shareId);
  };
}
