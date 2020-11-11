import ShareDAO from "../database/daos/share-dao";
import { ShareItemProps } from "../types/share";

export default class ShareService {
  addShare = (share: ShareItemProps) => {
    return new ShareDAO().addShare(share);
  };

  getShares = (shareId: string) => {
    return new ShareDAO().getShares(shareId);
  };

  deleteShareById = (shareId: string) => {
    return new ShareDAO().deleteShareById(shareId);
  };
}
