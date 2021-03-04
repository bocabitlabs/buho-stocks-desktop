const { database } = require("./load-database");

function closeDB() {
  database.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.info("Closed the database connection.");
  });
}

module.exports = { closeDB };
