const { app } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const log = require("electron-log");
const Database = require("better-sqlite3");

let appPath = app.getPath("userData");
if (isDev) {
  appPath = "./dev-data";
}
let databasePath = path.join(appPath, "buho-stocks.sqlite3");
log.info(`Database Path: ${databasePath}`);

// The first call creates the global instance with your settings
let database = new Database(databasePath);

module.exports = { database };
