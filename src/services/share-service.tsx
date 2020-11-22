import ShareDAO from "../database/daos/share-dao";
import { ShareItemProps } from "../types/share";

export default class ShareService {
  addShare = (share: ShareItemProps) => {
    return new ShareDAO().addShare(share);
  };

  getShares = (companyId: string) => {
    return new ShareDAO().getShares(companyId);
  };

  getSharesPerYearByCompanyId = (companyId: string) => {
    return new ShareDAO().getSharesPerYearByCompanyId(companyId);
  };

  deleteById = (shareId: string) => {
    return new ShareDAO().deleteById(shareId);
  };
}
