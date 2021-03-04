const { ipcMain } = require("electron");
const { database } = require("./database/load-database");
const { handleStatement } = require("./database/main");

const log = require("electron-log");
const { saveFile } = require("./save-file-dialog");

ipcMain.on("synchronous-message", (event, arg, queryType) => {
  const sql = arg;

  try {
    const statement = database.prepare(sql);
    const statementResult = handleStatement(queryType, statement);
    event.returnValue = statementResult;
  } catch (error) {
    log.error(error);
    event.returnValue = "ERROR";
  }
});

ipcMain.on("save-file", (event, arg) => {
  const dataToSave = arg;

  try {
    saveFile(dataToSave);
    event.returnValue = "OK";
  } catch (error) {
    log.error(error);
    event.returnValue = "ERROR";
  }
});
