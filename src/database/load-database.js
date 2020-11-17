const { app } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const log = require("electron-log");
const Database = require("better-sqlite3");

let appPath = app.getPath("userData");
log.info(path.join(appPath, "db.sqlite3"));

if (isDev) {
  appPath = "./public";
}

// The first call creates the global instance with your settings
const database = new Database(
  path.join(appPath, "db.sqlite3")
  // ,
  // (err) => {
  //   if (err) log.error("Database opening error: ", err);
  // }
);

module.exports = { database };
