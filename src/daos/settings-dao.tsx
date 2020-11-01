import {
  getSettingsMessageReply,
  addSettingsMessageReply,
  updateSettingsMessageReply
} from "../message-control/messages";
import { SettingsItemProps } from "../types/settings";
// import { SettingsItemProps } from "../types/settings";
import sendSqlWithCallback from "./send-sql";

/**
 *
 * @param callback
 */
export const getSettings = async (callback: Function) => {
  //Call the DB
  console.log("Get all settings");
  const sql = `SELECT * FROM settings WHERE id='1'`;
  sendSqlWithCallback(sql, getSettingsMessageReply, callback, (error: string) =>
    console.log(error)
  );
};

export function addSettings(settings: SettingsItemProps, callback: Function) {
  //Call the DB
  const sql = `INSERT INTO "settings"
  ("selectedPortfolio")
  VALUES ('${settings.selectedPortfolio}');`;

  console.log(sql);

  sendSqlWithCallback(sql, addSettingsMessageReply, callback, (error: string) =>
    console.log(error)
  );

  return sql;
}

export function updateSelectedPortfolio(
  selectedPortfolio: string,
  callback: Function
) {
  //Call the DB
  const sql = `UPDATE "settings" SET "selectedPortfolio" = '${selectedPortfolio}' WHERE "id" = '1';`;

  sendSqlWithCallback(
    sql,
    updateSettingsMessageReply,
    callback,
    (error: string) => console.log(error)
  );

  return sql;
}

export function toggleCollapsed(callback: Function) {
  //Call the DB
  const sql = `UPDATE "settings" SET collapsed = ((collapsed | 1) - (collapsed & 1)) WHERE "id" = '1';`;

  sendSqlWithCallback(
    sql,
    updateSettingsMessageReply,
    callback,
    (error: string) => console.log(error)
  );

  return sql;
}
