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

module.exports = { handleStatement };
