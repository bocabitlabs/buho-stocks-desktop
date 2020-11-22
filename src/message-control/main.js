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

  // const execSql = () => {
  //   log.debug("Exec query");
  //   const row = database.exec(sql);
  //   log.debug(row);
  //   return row;
  // };

  try {
    // if (queryType === "exec") {
    //   const result = execSql();
    //   event.returnValue = result;
    //   return;
    // }

    const statement = database.prepare(sql);
    // log.debug(statement);
    // log.debug(sql);
    // log.debug(queryType);
    const statementResult = handleStatement(queryType, statement);
    event.returnValue = statementResult;
  } catch (error) {
    log.error(error);
    event.returnValue = "ERROR";
  }
});
