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

export function updateSettings(
  settings: SettingsItemProps,
  callback: Function
) {
  //Call the DB
  const sql = `UPDATE "settings" SET "selectedPortfolio" = '${settings.selectedPortfolio}' WHERE "id" = '1';`;

  console.log(sql);

  sendSqlWithCallback(
    sql,
    updateSettingsMessageReply,
    callback,
    (error: string) => console.log(error)
  );

  return sql;
}
