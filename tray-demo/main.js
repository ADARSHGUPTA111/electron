const { app, BrowserWindow } = require("electron");
const electron = require("electron");
//BrowserWindow creates and manages window
const path = require("path");
const url = require("url");
const Tray = electron.Tray;
const iconPath = path.join(__dirname, "icon.png");
const Menu = electron.Menu;

let mainWindow;
let tray = null;

app.on("ready", function () {
  tray = new Tray(iconPath);
  let template = [
    {
      label: "Audio",
      submenu: [
        {
          label: "low",
          type: "radio",
          checked: true
        },
        {
          label: "High",
          type: "radio"
        }
      ]
    },
    {
      label: "Video",
      submenu: [
        {
          label: "1280x720",
          type: "radio",
          checked: true
          //checked by default
        },
        {
          label: "1920x1080",
          type: "radio"
        }
      ]
    }
  ];

  const ctxMenu = Menu.buildFromTemplate(template);
  tray.setContextMenu(ctxMenu);
  tray.setToolTip("Tray Application");
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
  }
});

//here there will be no browserwindow opened
//but there will be a small icon be appearing at the bottom right or in the arrow button
