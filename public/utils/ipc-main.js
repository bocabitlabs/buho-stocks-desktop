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

ipcMain.on("backup-database", (event, arg, queryType) => {
  let path = arg;
  if (path === "" || path === null || path === undefined) {
    const { app } = require("electron");
    const isDev = require("electron-is-dev");
    path = app.getPath("userData");
    if (isDev) {
      path = "./dev-data";
    }
  }
  if (path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  database
    .backup(`${path}/backup-${Date.now()}.db`)
    .then(() => {
      console.info("Backup complete!");
      event.returnValue = {result: "OK", path};
    })
    .catch((err) => {
      console.error("backup failed:", err);
      event.returnValue = {result: "ERROR", path};
    });
});
