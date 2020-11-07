const electron = window.require("electron");
const { ipcRenderer } = electron;


export default function sendSql(sql, queryType="select") {
  console.log(`Calling send for ${sql}`);
  const result = ipcRenderer.sendSync("synchronous-message", sql, queryType)
  return result;
}
