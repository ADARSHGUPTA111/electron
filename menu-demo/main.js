const { app, BrowserWindow } = require("electron");
const electron = require("electron");
//BrowserWindow creates and manages window

const path = require("path");
const url = require("url");

const Menu = electron.Menu; //the hero submodule here
const MenuItem = electron.MenuItem;
//Context-Menu is the menu that is visible when someone right clicks in our application

const globalShortcut = electron.globalShortcut;
//Global Shortcut is the one that works even if the electron app is not in focus

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
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

app.on("ready", function () {
  createWindow();
  //objects in submenu will act like the drop down menus
  const template = [
    {
      label: "Edit",
      //the roles here are already been implemented and also work with standard keyboard shortcuts
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { role: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "pasteandmatchstyle" },
        { role: "delete" },
        { role: "selectall" }
      ]
    },
    {
      label: "demo",
      submenu: [
        {
          label: "submenu1",
          click: function () {
            console.log("Clicked SubMenu 1");
          }
        },
        {
          type: "separator"
        },
        {
          label: "submenu2"
        }
      ]
    },
    {
      label: "Help",
      submenu: [
        {
          label: "About Electron",
          click: function () {
            electron.shell.openExternal("http://electron.atom.io");
          },
          accelerator: "CmdOrCtrl + Shift + H"
          //accelerators are nothing but the shortcuts
          //here we are making a customized keyboard shortcut
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  const ctxMenu = new Menu();
  ctxMenu.append(
    new MenuItem({
      label: "Hello",
      click: function () {
        console.log("Context Menu Item Clicked");
      }
    })
  );
  ctxMenu.append(new MenuItem({ role: "selectAll" }));

  //Remember : the right click on any page is the event context-menu
  mainWindow.webContents.on("context-menu", (e, params) => {
    ctxMenu.popup(mainWindow, params.x, params.y);
  });

  globalShortcut.register("Alt+1", function () {
    mainWindow.show();
    // when you use shortcut then this window will come in focus automatically despite being anywhere
    //when you close this app then these shortcuts get unregistered
  });
});

app.on("will-quit", function () {
  globalShortcut.unregisterAll();
});

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
