const fs = require("fs");
const path = require("path");
const log = require("electron-log");

const { database, getQueriesFolderPath } = require("./load-database");

const insertSettings = (loadingEvents) => {
  log.debug("Inserting settings...");
  loadingEvents.emit("progress", "DB: Inserting settings if required.");
  try {
    const queriesFolderPath = getQueriesFolderPath();
    const queryFilePath = path.join(queriesFolderPath, "insert_settings.sql");

    const dataSql = fs.readFileSync(queryFilePath).toString();
    const dataArr = dataSql.toString().split(");");
    let result = false;
    dataArr.forEach((query) => {
      if (query) {
        // Add the delimiter back to each query before you run them
        // In my case the it was `);`
        query += ");";

        try {
          const createTable = database.prepare(query);
          createTable.run();
          result = true;
        } catch (error) {
          log.info("Settings already exist");
          result =  true;
        }
      }
    });
    log.debug(`done (result: ${result})`);
    loadingEvents.emit("progress", "DB: Settings inserted if required.");
    return result;
  } catch (error) {
    log.error(error);
    throw error;
  }
};

module.exports = { insertSettings };
