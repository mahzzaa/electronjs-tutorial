const {
  app,
  BrowserWindow,
  Menu,
  shell,
  MenuItem,
  globalShortcut,
} = require("electron");
const path = require("path");
const url = require("url");
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 200,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
}

app.on("ready", function () {
  createWindow();
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Quit",
          accelerator: "CmdOrCtrl+Q",
          click() {
            app.quit();
          },
        },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "delete" },
        { type: "separator" },
        { role: "selectAll" },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Electron Documentation",
          click: function () {
            shell.openExternal("https://www.electronjs.org/docs/latest");
          },
          accelerator: "CmdOrCtrl+H",
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  const contextMenu = new Menu();
  contextMenu.append(
    new MenuItem({
      label: "Cut",
      role: "cut",
    })
  );
  contextMenu.append(
    new MenuItem({
      label: "Copy",
      role: "copy",
    })
  );
  contextMenu.append(
    new MenuItem({
      label: "Paste",
      role: "paste",
    })
  );
  contextMenu.append(
    new MenuItem({
      label: "Select All",
      role: "selectAll",
      accelerator: "CmdOrCtrl+A",
    })
  );

  mainWindow.webContents.on("context-menu", (e, params) => {
    contextMenu.popup(mainWindow, params.x, params.y);
  });

  globalShortcut.register("CmdOrCtrl+R", () => {
    mainWindow.reload();
  });
  globalShortcut.register("CmdOrCtrl+O", () => {
    mainWindow.show();
  });
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

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
