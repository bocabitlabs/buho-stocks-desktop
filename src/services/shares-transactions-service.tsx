import { SharesTransactionFormProps } from "types/shares-transaction";
import SharesTransactionsDAO from "database/daos/shares-transactions-dao";
import { IAddProps } from "types/common";

export default class SharesTransactionsService {
  static addSharesTransaction = (share: SharesTransactionFormProps): IAddProps => {
    console.log("Adding share transaction: SharesTransactionService")
    return SharesTransactionsDAO.addSharesTransaction(share);
  };

  static getShares = (companyId: string) => {
    return SharesTransactionsDAO.getSharesTransactions(companyId);
  };

  static getSharesTransactionsPerYearByCompanyId = (companyId: string) => {
    return SharesTransactionsDAO.getSharesTransactionsPerYearByCompanyId(
      companyId
    );
  };

  static deleteById = (shareId: string) => {
    return SharesTransactionsDAO.deleteById(shareId);
  };
}
