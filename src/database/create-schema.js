const fs = require("fs");
const path = require("path");
const log = require("electron-log");

const { database, getQueriesFolderPath } = require("./load-database");

const createDBSchema = () => {
  log.info("Creating DB schema if needed...");
  try {
    let queriesFolderPath = getQueriesFolderPath();
    const queryFilePath = path.join(queriesFolderPath, "create_db_schema.sql");
    log.info(queryFilePath);

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
            if (err) throw err;
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

module.exports = { createDBSchema };
