console.log("From 1");

const BrowserWindow = require("electron").remote.BrowserWindow;
const path = require("path");
const url = require("url");

const newWindowButton = document.getElementById("newWindowBtn");
newWindowButton.addEventListener("click", e => {
  let winThree = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true //By default require() is not a valid function in client side javascript. So to solve that issue
    }
  });

  winThree.loadURL(
    url.format({
      pathname: path.join(__dirname, "three.html"),
      protocol: "file",
      slashes: true
    })
  );

  winThree.webContents.openDevTools();
});
