const { app } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
// const sqlite3 = require("sqlite3");
const log = require("electron-log");
const Database = require("better-sqlite3");

let appPath = app.getPath("userData");
log.info(path.join(appPath, "db.sqlite3"));

if (isDev) {
  appPath = "./public";
}
const database = new Database(
  path.join(appPath, "db.sqlite3")
  // ,
  // (err) => {
  //   if (err) log.error("Database opening error: ", err);
  // }
);

const getQueriesFolderPath = () => {
  let queriesFolderPath = path.join(__dirname, "../database/queries");
  if (isDev) {
    queriesFolderPath = path.join(__dirname, "./queries");
  }
  return queriesFolderPath;
};

module.exports = { database, getQueriesFolderPath };
