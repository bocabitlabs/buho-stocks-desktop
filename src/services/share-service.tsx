import ShareDAO from "../database/daos/share-dao";
import { ShareItemProps } from "../types/share";

export default class SettingsService {
  addShare = (share: ShareItemProps, callback: Function) => {
    new ShareDAO().addShare(share, callback);
  };

  getShares = (companyId: string, callback: Function) => {
    new ShareDAO().getShares(companyId, callback);
  };
}
