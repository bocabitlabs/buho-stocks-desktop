const fs = require("fs");
const path = require("path");
const log = require("electron-log");

const { database, getQueriesFolderPath } = require("./load-database");

const insertSettings = () => {
  log("Inserting settings...");
  try {
    const queriesFolderPath = getQueriesFolderPath();
    const queryFilePath = path.join(queriesFolderPath, "insert_settings.sql");

    const dataSql = fs.readFileSync(queryFilePath).toString();
    const dataArr = dataSql.toString().split(");");

    database.serialize(() => {
      // db.run runs your SQL query against the DB
      database.run("PRAGMA foreign_keys=OFF;");
      database.run("BEGIN TRANSACTION;");
      // Loop through the `dataArr` and db.run each query
      dataArr.forEach((query) => {
        if (query) {
          // Add the delimiter back to each query before you run them
          // In my case the it was `);`
          query += ");";
          database.run(query, (err) => {
            if (err) {
              console.log("Settings already inserted. Skipped...");
            }
          });
        }
      });
      database.run("COMMIT;");
    });
  } catch (error) {
    log.error(error);
    throw error;
  }
  log.info("done");
};

module.exports = { insertSettings };
