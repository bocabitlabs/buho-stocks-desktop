const fs = require("fs");
const path = require("path");
const log = require("electron-log");

const { database, getQueriesFolderPath } = require("./load-database");

const insertSettings = () => {
  log.info("Inserting settings...");
  try {
    const queriesFolderPath = getQueriesFolderPath();
    const queryFilePath = path.join(queriesFolderPath, "insert_settings.sql");

    const dataSql = fs.readFileSync(queryFilePath).toString();
    const dataArr = dataSql.toString().split(");");

    dataArr.forEach((query) => {
      if (query) {
        // Add the delimiter back to each query before you run them
        // In my case the it was `);`
        query += ");";

        try {
          const createTable = database.prepare(query);
          createTable.run();
        } catch (error) {
          log.info("Settings already exist");
          // throw error;
        }
      }
    });

  } catch (error) {
    log.error(error);
    throw error;
  }
  log.info("done");
};

module.exports = { insertSettings };
