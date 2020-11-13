import sendIpcSql from "../../message-control/renderer";
import { SettingsItemProps } from "../../types/settings";

export default class SettingsOperations {
  getSettings = () => {
    //Call the DB
    console.log("Get all settings");
    const sql = `SELECT * FROM settings WHERE id='1'`;
    const result = sendIpcSql(sql, "get");
    console.log(result);
    return result;
  };
  getIsCollapsed = () => {
    const sql = `SELECT collapsed FROM settings WHERE id='1'`;
    const result = sendIpcSql(sql, "get");
    console.log(result);
    return result.collapsed;
  }
  getSelectedPortfolio = () => {
    const sql = `SELECT selectedPortfolio FROM settings WHERE id='1'`;
    const result = sendIpcSql(sql, "get");
    console.log(result);
    return result.selectedPortfolio;
  }
  addSettings(settings: SettingsItemProps) {
    //Call the DB
    const sql = `INSERT INTO "settings"
    ("selectedPortfolio")
    VALUES ('${settings.selectedPortfolio}');`;

    const results = sendIpcSql(sql, "insert");
    console.log(results);

    return results;
  }
  updateSelectedPortfolio = (selectedPortfolio: string) => {
    //Call the DB
    const sql = `UPDATE "settings" SET "selectedPortfolio" = '${selectedPortfolio}' WHERE "id" = '1';`;

    const results = sendIpcSql(sql, "insert");
    console.log(results);

    return results;
  };

  toggleCollapsed = () => {
    //Call the DB
    const sql = `UPDATE "settings" SET collapsed = ((collapsed | 1) - (collapsed & 1)) WHERE "id" = '1';`;

    const results = sendIpcSql(sql, "insert");
    return results
  };
}
