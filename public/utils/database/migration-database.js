const { app } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const log = require("electron-log");
const DB = require("better-sqlite3-helper");

let appPath = app.getPath("userData");

if (isDev) {
  appPath = "./dev-data";
}

const getMigrationsFolderPath = () => {
  let queriesFolderPath = path.join(__dirname, "../database/migrations");
  if (isDev) {
    queriesFolderPath = path.join(__dirname, "./migrations");
  }
  log.info(queriesFolderPath);
  return queriesFolderPath;
};

const createDBandMigrate = (loadingEvents) => {
  log.info("Creating database and schema...");
  loadingEvents.emit("progress", "Creating DB schema if needed...");
  try {
    // The first call creates the global instance with your settings
    DB({
      path: path.join(appPath, "buho-stocks.sqlite3"), // this is the default
      fileMustExist: false, // throw error if database not exists
      migrate: {
        // disable completely by setting `migrate: false`
        force: false, // set to 'last' to automatically reapply the last migration-file
        table: "migration", // name of the database table that is used to keep track
        migrationsPath: getMigrationsFolderPath() // path of the migration-files
      }
    });
    DB().query("SELECT * FROM settings");
    DB().close();
  } catch (error) {
    log.error(error);
    throw error;
  }
  loadingEvents.emit("progress", "Created DB schema and migrations.");
  return true;
};

module.exports = { createDBandMigrate };
