import SettingsDAO from "database/daos/settings-dao";
import { SettingsItemProps } from "types/settings";

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

  static addSettings = (settings: SettingsItemProps) => {
    return SettingsDAO.addSettings(settings);
  };

  static updateSelectedPortfolio = (selectedPortfolio: string) => {
    return SettingsDAO.updateSelectedPortfolio(selectedPortfolio);
  };

  static toggleCollapsed = () => {
    //Call the DB
    return SettingsDAO.toggleCollapsed();
  };
}
