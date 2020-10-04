const sqlite3 = require("sqlite3");

const database = new sqlite3.Database("./public/db.sqlite3", (err) => {
  if (err) console.error("Database opening error: ", err);
});

module.exports = { database };
