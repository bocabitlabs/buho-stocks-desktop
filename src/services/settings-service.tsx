import SettingsDAO from "database/daos/settings-dao";
import { ISettings } from "types/settings";

export default class SettingsService {
  static getSettings = () => {
    return SettingsDAO.getSettings();
  };

  static getIsCollapsed = () => {
    return SettingsDAO.getIsCollapsed();
  };

  static getSelectedPortfolio = () => {
    return SettingsDAO.getSelectedPortfolio();
  };

  static addSettings = (settings: ISettings) => {
    return SettingsDAO.addSettings(settings);
  };

  static updateSelectedPortfolio = (selectedPortfolio: string) => {
    return SettingsDAO.updateSelectedPortfolio(selectedPortfolio);
  };

  static updateLanguage = (language: string) => {
    return SettingsDAO.updateLanguage(language);
  };

  static updateDatabasePath = (path: string) => {
    return SettingsDAO.updateDatabasePath(path);
  };

  static toggleCollapsed = () => {
    //Call the DB
    return SettingsDAO.toggleCollapsed();
  };
}
