// from this main renderer we can make multiple renderer processes and from those we can make more
// as winThree is made from winOne and they dont interfere amongst them
const { app, BrowserWindow } = require("electron");
console.log("from main.js");
//BrowserWindow creates and manages window
const path = require("path");
const url = require("url");

let winOne, winTwo;

function createWindow() {
  // Create the browser window.
  winOne = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true //By default require() is not a valid function in client side javascript. So to solve that issue
    }
  });
  winTwo = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true //By default require() is not a valid function in client side javascript. So to solve that issue
    }
  });
  winOne.webContents.openDevTools();
  winTwo.webContents.openDevTools();

  // and load the index.html of the app.
  winOne.loadURL(
    url.format({
      pathname: path.join(__dirname, "one.html"),
      protocol: "file",
      slashes: true
    })
  );
  winTwo.loadURL(
    url.format({
      pathname: path.join(__dirname, "two.html"),
      protocol: "file",
      slashes: true
    })
  );

  winOne.on("closed", function () {
    winOne = null;
  });
  winTwo.on("closed", function () {
    winTwo = null;
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
  if (winOne === null) {
    createWindow();
  }
});
app.on("activate", function () {
  if (winTwo === null) {
    createWindow();
  }
});
