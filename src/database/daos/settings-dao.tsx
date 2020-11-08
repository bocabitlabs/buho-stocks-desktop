import sendIpcSql from "../../message-control/renderer";
import { SettingsItemProps } from "../../types/settings";

export default class SettingsOperations {
  getSettings = (callback: Function) => {
    //Call the DB
    console.log("Get all settings");
    const sql = `SELECT * FROM settings WHERE id='1'`;
    const result = sendIpcSql(sql, "get");
    console.log(result);
    callback(result);
  };
  addSettings(settings: SettingsItemProps, callback: Function) {
    //Call the DB
    const sql = `INSERT INTO "settings"
    ("selectedPortfolio")
    VALUES ('${settings.selectedPortfolio}');`;

    const results = sendIpcSql(sql, "insert");
    console.log(results);

    callback(results);
  }
  updateSelectedPortfolio = (selectedPortfolio: string, callback: Function) => {
    //Call the DB
    const sql = `UPDATE "settings" SET "selectedPortfolio" = '${selectedPortfolio}' WHERE "id" = '1';`;

    const results = sendIpcSql(sql, "insert");
    console.log(results);

    callback(results);
  };

  toggleCollapsed = (callback: Function) => {
    //Call the DB
    const sql = `UPDATE "settings" SET collapsed = ((collapsed | 1) - (collapsed & 1)) WHERE "id" = '1';`;

    const results = sendIpcSql(sql, "insert");
    console.log(results);

    callback(results);
  };
}
