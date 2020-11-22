const electron = window.require("electron");
const { ipcRenderer } = electron;

export default function sendIpcSql(
  sql: string,
  queryType: "raw" | "exec" | "select" | "insert" | "delete" | "get" = "select"
) {
  const result = ipcRenderer.sendSync("synchronous-message", sql, queryType);
  return result;
}
