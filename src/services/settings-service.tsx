import SettingsDAO from "../database/daos/settings-dao";
import { SettingsItemProps } from "../types/settings";

export default class SettingsService {
  /**
   *
   * @param callback
   */
  getSettings = (callback: Function) => {
    new SettingsDAO().getSettings(callback);
  };

  addSettings = (settings: SettingsItemProps, callback: Function) => {
    new SettingsDAO().addSettings(settings, callback);
  };

  updateSelectedPortfolio = (selectedPortfolio: string, callback: Function) => {
    new SettingsDAO().updateSelectedPortfolio(
      selectedPortfolio,
      callback
    );
  };

  toggleCollapsed = (callback: Function) => {
    //Call the DB
    new SettingsDAO().toggleCollapsed(callback);
  };
}
