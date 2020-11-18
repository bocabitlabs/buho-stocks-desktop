const { ipcMain } = require("electron");
const { database } = require("../database/load-database");
const log = require("electron-log");

function handleStatement(type, statement) {
  const runStatement = () => {
    statement.run();
    return "OK";
  };

  const queryAllStatement = () => {
    const rows = statement.all();
    log.info(rows);
    return rows;
  };

  const getStatement = () => {
    const row = statement.get();
    return row;
  };

  const dbCalls = {
    select: queryAllStatement,
    insert: runStatement,
    delete: runStatement,
    get: getStatement
  };
  return dbCalls[type]();
}

ipcMain.on("synchronous-message", (event, arg, queryType) => {
  const sql = arg;

  try {
    const statement = database.prepare(sql);
    log.debug(sql);
    log.info(queryType);
    const statementResult = handleStatement(queryType, statement);
    event.returnValue = statementResult;
  } catch (error) {
    log.error(error);
    event.returnValue = "ERROR";
  }
  log.info("< ipcMain end");
});
