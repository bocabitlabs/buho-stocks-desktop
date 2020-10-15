const fs = require("fs");
const path = require("path");

const { database } = require("./load-database");

const createDBSchema = () => {
  console.log("Creating DB schema if needed...");
  const queriesFolderPath = path.join(__dirname, "./queries");
  const queryFilePath = path.join(queriesFolderPath, "create_db_schema.sql");
  console.log(queryFilePath);

  const dataSql = fs.readFileSync(queryFilePath).toString();
  const dataArr = dataSql.toString().split(");");

  console.log(dataArr);

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
        console.log(`Running query: ${query}`);
        database.run(query, (err) => {
          if (err) throw err;
        });
      }
    });
    database.run("COMMIT;");
  });
};

module.exports = { createDBSchema };
