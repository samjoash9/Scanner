const { app, BrowserWindow } = require("electron");
const { exec } = require("child_process");
const path = require("path");

let mainWindow;
let djangoProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL("http://localhost:8000"); // Django serves the React frontend
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  // Start Django server
  djangoProcess = exec("python manage.py runserver 8000", { cwd: path.join(__dirname, "backend") });

  djangoProcess.stdout.on("data", (data) => console.log(`Django: ${data}`));
  djangoProcess.stderr.on("data", (data) => console.error(`Django Error: ${data}`));

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    djangoProcess.kill();
    app.quit();
  }
});
