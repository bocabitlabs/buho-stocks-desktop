const { ipcMain } = require("electron");
const { database } = require("./load-database");
const log = require("electron-log");

function handleStatement(type, statement) {
  const runStatement = () => {
    const result = statement.run();
    return result;
  };

  const queryAllStatement = () => {
    const rows = statement.all();
    return rows;
  };

  const getStatement = () => {
    const row = statement.get();
    return row;
  };

  const dbCalls = {
    select: queryAllStatement,
    insert: runStatement,
    update: runStatement,
    delete: runStatement,
    get: getStatement
  };
  return dbCalls[type]();
}

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
