const { ipcMain } = require("electron");
const { database } = require("../database/load-database");
const log = require("electron-log");

ipcMain.on("synchronous-message", (event, arg, queryType) => {
  log.info("> ipcMain start");
  log.info(arg); // prints "ping"
  const sql = arg;

  try {
    const statement = database.prepare(sql);
    log.info(sql);
    log.info(queryType);
    if (queryType === "select") {
      const rows = statement.all();
      log.info(rows);
      event.returnValue = rows;
    } else if (queryType === "insert") {
      statement.run();
      event.returnValue = "OK";
    } else if (queryType === "get") {
      const row = statement.get();
      event.returnValue = row;
    }
  } catch (error) {
    log.error(error);
    event.returnValue = "ERROR";
  }
  log.info("< ipcMain end");
});
