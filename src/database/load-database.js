const { app } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const log = require("electron-log");
const Database = require("better-sqlite3");

let appPath = app.getPath("userData");
if (isDev) {
  appPath = "./public";
}
const databasePath = path.join(appPath, "db.sqlite3")
log.info(`Database Path: ${databasePath}`);

// The first call creates the global instance with your settings
const database = new Database(databasePath);

module.exports = { database };
