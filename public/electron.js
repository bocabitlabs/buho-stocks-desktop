const path = require("path");
const fs = require("fs");
const { db } = require("../package.json");
const EventEmitter = require("events");
const { app, BrowserWindow, shell, Menu, MenuItem } = require("electron");
const isDev = require("electron-is-dev");
const log = require("electron-log");

require("../src/message-control/main");
const { createDBSchema } = require("../src/database/create-schema");
const { insertSettings } = require("../src/database/insert-settings");

const { closeDB } = require("../src/database/close-database");

// Conditionally include the dev tools installer to load React Dev Tools
let installExtension, REACT_DEVELOPER_TOOLS; // NEW!

const loadingEvents = new EventEmitter();
const createMainWindow = () =>
  new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });

if (isDev) {
  log.info("Installing devtools");
  const devTools = require("electron-devtools-installer");
  installExtension = devTools.default;
  REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit();
}

function createWindow() {
  // Create the browser window.
  log.debug("Loading main window...");

  // https://dev.to/abulhasanlakhani/conditionally-appending-developer-tools-menuitem-to-an-existing-menu-in-electron-236k
  Menu.setApplicationMenu(menu);

  const win = new BrowserWindow({
    width: 1100,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }

  var handleRedirect = (e, url) => {
    if (url !== win.webContents.getURL()) {
      e.preventDefault();
      require("electron").shell.openExternal(url);
    }
  };

  win.webContents.on("will-navigate", handleRedirect);
  win.webContents.on("new-window", handleRedirect);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  log.debug("Creating loading window");
  const loadingWindow = createMainWindow();
  log.debug("Loading loading.html file");
  try {
    loadingWindow.loadURL(`file://${__dirname}/loading.html`);
    // window.loadFile("./index.html");
  } catch (e) {
    log.error(e);
  }

  // Our loadingEvents object listens for 'finished'
  loadingEvents.on("finished", () => {
    log.debug("Loading finished");
    loadingWindow.close();
    createWindow();
    // window.loadURL(`file://${__dirname}/index2.html`);
  });

  loadingEvents.on("progress", (message) => {
    log.debug(`Sending loading progress: ${message}`);
    loadingWindow.webContents.send("progress", message);
  });

  const { database } = require("../src/database/load-database");
  const statement = database.prepare(
    "SELECT currentDatabaseVersion FROM settings WHERE id='1';"
  );
  const row = statement.get();
  log.info(`Current version: ${parseFloat(row.currentDatabaseVersion)}`);
  log.info(`Required version: ${parseFloat(db.requiredVersion)}`);

  if (row.currentDatabaseVersion < db.requiredVersion) {
    log.debug(
      `Need to run migrations: current: ${row.currentDatabaseVersion} required: ${db.requiredVersion}`
    );

  }
  // Verify the DB version and run migrations if needed.
  // Version on DB is < than db.requiredVersion?
  // -> Run migrations
  // Version on DB is > than db.requiredVersion?
  // -> Notify: "You need a higher version of the application to use the current database"

  const schemaOk = createDBSchema(loadingEvents);
  const settingsOk = insertSettings(loadingEvents);
  if (schemaOk && settingsOk) {
    log.debug("Emit: finished DB loading");
    loadingEvents.emit("finished");
  }
  // download("https://512pixels.net/downloads/macos-wallpapers/10-15-Day.jpg");

  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => log.info(`Added Extension:  ${name}`))
      .catch((err) => log.error("An error occurred: ", err));
  }
}); // UPDATED!

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    closeDB();
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

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

const menu = Menu.buildFromTemplate([
  {
    label: "App",
    submenu: [
      { role: "about" },
      {
        label: "Open logs folder",
        accelerator: "CmdOrCtrl+L",
        click: (menuItem) => {
          log.info("Clicked Open logs folder");
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
