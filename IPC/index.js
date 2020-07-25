const electron = require("electron");
const ipc = electron.ipcRenderer;

const asyncBtn = document.getElementById("asyncBtn");
const syncBtn = document.getElementById("syncBtn");

//this shows how we can communicate from the renderer process to the main process

asyncBtn.addEventListener("click", () => {
  console.log("Async 1");
  ipc.send("async-message");
  console.log("Async 2");
});

syncBtn.addEventListener("click", () => {
  console.log("Sync 1");
  const reply = ipc.sendSync("sync-message"); //little changes while sending the sync messages
  console.log(reply);
  console.log("Sync 2");
});

//listening from the main
ipc.on("async-reply", function (event, arg) {
  console.log(arg);
});
//synchronous ipc blocks other processes while asynchronous does not block other processes

const BrowserWindow = electron.remote.BrowserWindow;
let window = new BrowserWindow();
window.loadURL("http://youtube.com");
//remote does the task synchronously
