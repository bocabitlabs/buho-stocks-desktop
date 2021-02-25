const path = require("path");
// const fs = require("fs");
const EventEmitter = require("events");
const { app, BrowserWindow, Menu } = require("electron");
const isDev = require("electron-is-dev");
const log = require("electron-log");
require("./utils/database/main");

const { closeDB } = require("./utils/database/close-database");
const { applicationMenu } = require("./utils/app-menu");
// Conditionally include the dev tools installer to load React Dev Tools
let installExtension, REACT_DEVELOPER_TOOLS;

const loadingEvents = new EventEmitter();
const createLoadingWindow = () =>
  new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit();
}

function createMainWindow() {
  // Create the browser window.
  log.debug("Loading main window...");

  // https://dev.to/abulhasanlakhani/conditionally-appending-developer-tools-menuitem-to-an-existing-menu-in-electron-236k
  Menu.setApplicationMenu(applicationMenu);

  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false
    }
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  const handleRedirect = (e, url) => {
    /**
     * Handle a link inside the application, opening the default OS browser
     */
    if (url !== mainWindow.webContents.getURL()) {
      e.preventDefault();
      require("electron").shell.openExternal(url);
    }
  };

  mainWindow.webContents.on("will-navigate", handleRedirect);
  mainWindow.webContents.on("new-window", handleRedirect);

  // Open the DevTools.
  mainWindow.webContents.once('dom-ready', () => {
    if (isDev) {
      mainWindow.webContents.openDevTools({ mode: "detach" })
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  if (isDev) {
    const devTools = require("electron-devtools-installer");
    installExtension = devTools.default;
    REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err));
  }

  log.debug("Creating loading window");
  const loadingWindow = createLoadingWindow();
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
    createMainWindow();
  });

  loadingEvents.on("progress", (message) => {
    log.debug(`Sending loading progress: ${message}`);
    loadingWindow.webContents.send("progress", message);
  });

  const { createDBandMigrate } = require("./utils/database/migration-database");
  const migrated = createDBandMigrate(loadingEvents);
  if (migrated) {
    log.debug("Emit: finished DB loading");
    loadingEvents.emit("finished");
  } else {
    throw Error("Unable to create or migrate the Database");
  }

  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => log.info(`Added Extension:  ${name}`))
      .catch((err) => log.error("An error occurred: ", err));
  }
});

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
    createMainWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
