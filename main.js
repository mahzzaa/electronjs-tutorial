console.log("Hello, Electron!");
console.log("from main.js");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

require("@electron/remote/main").initialize();

let mainWindow;
let secondWindow;
let dimWindow, colorWindow, framelessWindow;
let parentWindow, childWindow;

function createWindow() {
  parentWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#ffff00",
    title: "Parent Window",
  });
  childWindow = new BrowserWindow({
    width: 400,
    height: 400,
    backgroundColor: "#0000ff",
    title: "Child Window",
    parent: parentWindow,
    modal: true,
    show: false,
  });
  childWindow.loadURL("https://github.com");
  childWindow.once("ready-to-show", () => {
    childWindow.show();
  });
  // mainWindow = new BrowserWindow({
  //   width: 800,
  //   height: 600,
  //   webPreferences: {
  //     nodeIntegration: true,
  //     contextIsolation: false,
  //   },
  // });
  // dimWindow = new BrowserWindow({
  //   width: 400,
  //   height: 400,
  //   maxHeight: 600,
  //   maxWidth: 600,
  // });
  // colorWindow = new BrowserWindow({
  //   width: 400,
  //   height: 400,
  //   maxHeight: 600,
  //   maxWidth: 600,
  //   backgroundColor: "#ff0000",
  // });
  // framelessWindow = new BrowserWindow({
  //   backgroundColor: "#00ff00",
  //   frame: false,
  //   width: 400,
  //   height: 400,
  //   maxHeight: 600,
  //   maxWidth: 600,
  // });
  // Uncomment to create a second window
  // secondWindow = new BrowserWindow({
  //   width: 800,
  //   height: 600,
  //   webPreferences: {
  //     nodeIntegration: true,
  //     contextIsolation: false,
  //     enableRemoteModule: true,
  //   },
  // });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  // secondWindow.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, "second.html"),
  //     protocol: "file:",
  //     slashes: true,
  //   })
  // );

  mainWindow.webContents.openDevTools();
  childWindow.show();
  // secondWindow.webContents.openDevTools();

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  // require("@electron/remote/main").enable(secondWindow.webContents);

  // secondWindow.on("closed", function () {
  //   secondWindow = null;
  // });
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
