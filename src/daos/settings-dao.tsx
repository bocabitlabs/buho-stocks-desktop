import sendSql from "../message-control/renderer";
import { SettingsItemProps } from "../types/settings";

/**
 *
 * @param callback
 */
export const getSettings = async (callback: Function) => {
  //Call the DB
  console.log("Get all settings");
  const sql = `SELECT * FROM settings WHERE id='1'`;
  const results = sendSql(sql);
  console.log(results);

  callback(results);
};

export function addSettings(settings: SettingsItemProps, callback: Function) {
  //Call the DB
  const sql = `INSERT INTO "settings"
  ("selectedPortfolio")
  VALUES ('${settings.selectedPortfolio}');`;

  const results = sendSql(sql, "insert");
  console.log(results);

  callback(results);

  return sql;
}

export function updateSelectedPortfolio(
  selectedPortfolio: string,
  callback: Function
) {
  //Call the DB
  const sql = `UPDATE "settings" SET "selectedPortfolio" = '${selectedPortfolio}' WHERE "id" = '1';`;

  const results = sendSql(sql, "insert");
  console.log(results);

  callback(results);

  return sql;
}

export function toggleCollapsed(callback: Function) {
  //Call the DB
  const sql = `UPDATE "settings" SET collapsed = ((collapsed | 1) - (collapsed & 1)) WHERE "id" = '1';`;

  const results = sendSql(sql, "insert");
  console.log(results);

  callback(results);

  return sql;
}
