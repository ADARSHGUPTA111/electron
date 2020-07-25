const { app, BrowserWindow } = require("electron");
const electron = require("electron");

const ipc = electron.ipcMain;
//BrowserWindow creates and manages window
const path = require("path");
const url = require("url");

const dialog = electron.dialog;

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // mainWindow.webContents.openDevTools();

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true
    })
  );

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

ipc.on("async-message", function (event) {
  event.sender.send("async-reply", "Main process opened the error dialog");
  //this shows how we can send a message from the main process to the renderer process
});

ipc.on("sync-message", function (event) {
  event.returnValue = "sync-reply";
  //this shows how we can send a message from the main process to the renderer process
});

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});

//as much as possible always stick to the async ipc
