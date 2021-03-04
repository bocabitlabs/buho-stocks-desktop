const { electron } = window;

const { sendSync } = electron;

export default function sendIpcSql(
  sql: string,
  queryType:
    | "raw"
    | "exec"
    | "select"
    | "insert"
    | "update"
    | "delete"
    | "get" = "select"
) {
  const result = sendSync("synchronous-message", sql, queryType);
  return result;
}
