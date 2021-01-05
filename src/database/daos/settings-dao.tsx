import sendIpcSql from "../../message-control/renderer";
import { SettingsItemProps } from "../../types/settings";

export default class SettingsDAO {
  static getSettings = () => {
    //Call the DB
    console.log("Get all settings");
    const sql = `SELECT * FROM settings WHERE id='1'`;
    const result = sendIpcSql(sql, "get");
    return result;
  };
  static getIsCollapsed = () => {
    const sql = `SELECT collapsed FROM settings WHERE id='1'`;
    const result = sendIpcSql(sql, "get");
    return result.collapsed;
  }
  static getSelectedPortfolio = () => {
    const sql = `SELECT selectedPortfolio FROM settings WHERE id='1'`;
    const result = sendIpcSql(sql, "get");
    return result.selectedPortfolio;
  }
  static addSettings(settings: SettingsItemProps) {
    //Call the DB
    const sql = `INSERT INTO "settings"
    ("selectedPortfolio")
    VALUES ('${settings.selectedPortfolio}');`;

    const results = sendIpcSql(sql, "insert");
    return results;
  }
  static updateSelectedPortfolio = (selectedPortfolio: string) => {
    //Call the DB
    const sql = `UPDATE "settings" SET "selectedPortfolio" = '${selectedPortfolio}' WHERE "id" = '1';`;

    const results = sendIpcSql(sql, "insert");
    return results;
  };
  static toggleCollapsed = () => {
    //Call the DB
    const sql = `UPDATE "settings" SET collapsed = ((collapsed | 1) - (collapsed & 1)) WHERE "id" = '1';`;
    const results = sendIpcSql(sql, "insert");
    return results
  };
}
