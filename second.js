console.log("Hello, from second.js!");
const { BrowserWindow } = require("@electron/remote");
const path = require("path");
const url = require("url");

const newWindowBtn = document.getElementById("newWindowBtn");
newWindowBtn.addEventListener("click", () => {
  let win = new BrowserWindow({
    width: 300,
    height: 200,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "newWindow.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  win.on("closed", () => {
    win = null;
  });
});
