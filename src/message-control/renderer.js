const electron = window.require("electron");
const { ipcRenderer } = electron;

// "asynchronous-reply"
// "asynchronous-message"

function handleMessageResponse(messageType, sql) {
    ipcRenderer.send("asynchronous-message", sql, messageType);
}

export default function send(sql, messageType) {
  console.log(`Calling send for ${sql} and ${messageType}`);
  return new Promise((resolve) => {
    ipcRenderer.once(messageType, (_, arg) => {
      console.log(`Resolving promise for ${sql}: ${JSON.stringify(arg)}`);
      console.log(resolve);
      resolve(arg, messageType);
    });
    handleMessageResponse(messageType, sql);
  });
}
