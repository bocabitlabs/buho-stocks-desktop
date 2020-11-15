const fs = require("fs");
const path = require("path");
const log = require("electron-log");

const { database, getQueriesFolderPath } = require("./load-database");

const createDBSchema = (loadingEvents) => {
  log.info("Creating DB schema if needed...");
  loadingEvents.emit("progress", "Creating DB schema if needed...");
  try {
    let queriesFolderPath = getQueriesFolderPath();
    const queryFilePath = path.join(queriesFolderPath, "create_db_schema.sql");
    log.info(queryFilePath);

    const dataSql = fs.readFileSync(queryFilePath).toString();
    const dataArr = dataSql.toString().split(");");

    dataArr.forEach((query) => {
      if (query) {
        // Add the delimiter back to each query before you run them
        // In my case the it was `);`
        query += ");";

        const createTable = database.prepare(query);
        createTable.run();
      }
    });
    loadingEvents.emit("progress", "DB schema created if required.");
    log.info("done");

    return true;
  } catch (error) {
    log.error(error);
    loadingEvents.emit("progress", "ERROR: Unable to create the DB schema.");
    throw error;
  }
};

module.exports = { createDBSchema };
