const { app } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const log = require("electron-log");
const Database = require("better-sqlite3");

let appPath = app.getPath("userData");
if (isDev) {
  appPath = "./data";
}
let databasePath = path.join(appPath, "buho-stocks.sqlite3");
log.info(`Database Path: ${databasePath}`);

// The first call creates the global instance with your settings
let database = new Database(databasePath);

try {
  const statement = database.prepare("SELECT * FROM settings WHERE id='1'");
  const settings = statement.get();
  log.info(settings);
  if (settings.databasePath) {
    log.info(`Loading database from a different place`);
    databasePath = path.join(settings.databasePath, "buho-stocks.sqlite3");
    log.info(databasePath);
    database = new Database(databasePath);

    // Keep databases in sync
    const statement = database.prepare(
      `INSERT INTO "settings" ("databasePath") VALUES ('${settings.databasePath}';`
    );
    statement.run();
  }
} catch (error) {
  log.error(error);
}

module.exports = { database };
