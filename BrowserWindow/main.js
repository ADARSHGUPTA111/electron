const { app, BrowserWindow } = require("electron");
//BrowserWindow creates and manages window
const path = require("path");
const url = require("url");

let mainWindow, dimWindow, colorWindow, frameLessWindow;
let parentWindow, childWindow;

function createWindow() {
  parentWindow = new BrowserWindow({ title: "parent" });
  childWindow = new BrowserWindow({
    parent: parentWindow,
    modal: true,
    show: false, //this shows without delay
    title: "child"
  });
  //child window is always on the top
  //it kind of disables the parent window ... first do something on the child and then only something to the parent could be done
  //modal brings a sound in the process

  childWindow.loadURL("https://www.youtube.com/"); // can load any url
  childWindow.once("ready-to-show", () => {
    childWindow.show();
  });

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  dimWindow = new BrowserWindow({
    width: 400,
    height: 400,
    maxHeight: 600,
    maxWidth: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  colorWindow = new BrowserWindow({
    backgroundColor: "#228b22",
    webPreferences: {
      nodeIntegration: true
    }
  });
  frameLessWindow = new BrowserWindow({
    backgroundColor: "#801728",
    frame: false,
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
