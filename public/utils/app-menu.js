const path = require("path");
const { app, Menu, shell } = require("electron");
const log = require("electron-log");

const openLogsFolder = () => {
  let logsPath;
  switch (process.platform) {
    case "darwin":
      logsPath = path.join(
        app.getPath("home"),
        "Library",
        "Logs",
        "Buho-Stocks",
        "main.log"
      );
      break;
    case "win32":
      logsPath = path.join(
        app.getPath("home"),
        "AppData",
        "Roaming",
        "Buho-Stocks",
        "main.log"
      );
      break;
    case "linux":
      logsPath = path.join(
        app.getPath("home"),
        ".config",
        "Buho-Stocks",
        "main.log"
      );
      break;
    default:
      break;
  }
  shell.showItemInFolder(logsPath);
};

const applicationMenu = Menu.buildFromTemplate([
  {
    label: "App",
    submenu: [
      { role: "about" },
      {
        label: "Open logs folder",
        accelerator: "CmdOrCtrl+L",
        click: (menuItem) => {
          log.debug("Clicked Open logs folder");
          openLogsFolder();
        }
      },
      {
        label: "Quit",
        accelerator: "CmdOrCtrl+Q",
        click: () => {
          app.quit();
        }
      }
    ]
  },
  {
    label: "Edit",
    submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      {
        label: "Select All",
        accelerator: "CmdOrCtrl+A",
        selector: "selectAll:"
      }
    ]
  },
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forcereload" },
      { role: "toggledevtools" },
      { type: "separator" },
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" }
    ]
  },
  {
    role: "window",
    submenu: [{ role: "minimize" }, { role: "close" }]
  }
]);

module.exports = { applicationMenu };
