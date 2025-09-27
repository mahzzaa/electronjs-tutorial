console.log("Hello, Electron!");
console.log("from main.js");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let mainWindow;
let secondWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  secondWindow = new BrowserWindow({ width: 400, height: 300 });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  secondWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "second.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.webContents.openDevTools();
  secondWindow.webContents.openDevTools();

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  secondWindow.on("closed", function () {
    secondWindow = null;
  });
}

app.on("ready", createWindow);

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
