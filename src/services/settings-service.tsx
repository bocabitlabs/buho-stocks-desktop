import SettingsDAO from "../database/daos/settings-dao";
import { SettingsItemProps } from "../types/settings";

export default class SettingsService {

  getSettings = () => {
    return new SettingsDAO().getSettings();
  };

  getIsCollapsed = () => {
    return new SettingsDAO().getIsCollapsed();
  };

  getSelectedPortfolio = () => {
    return new SettingsDAO().getSelectedPortfolio();
  };

  addSettings = (settings: SettingsItemProps) => {
    return new SettingsDAO().addSettings(settings);
  };

  updateSelectedPortfolio = (selectedPortfolio: string) => {
    return new SettingsDAO().updateSelectedPortfolio(selectedPortfolio);
  };

  toggleCollapsed = () => {
    //Call the DB
    return new SettingsDAO().toggleCollapsed();
  };
}
