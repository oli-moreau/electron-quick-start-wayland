const {app, BrowserWindow, ipcMain} = require('electron')
const { exec } = require("child_process");
const path = require('path')

app.disableHardwareAcceleration()

//Create the browser window.
function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 200,
    minHeight: 200,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html')
  
  //Maximize button
  ipcMain.on('maximize', () => {
    mainWindow.isMaximized() == false ? mainWindow.maximize() : mainWindow.unmaximize()
  })

  //Minimize button
  ipcMain.on('minimize', () => {
    mainWindow.minimize()
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

//Run shell command
ipcMain.on("run-command", (event, command) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return;
    }
    event.sender.send("command-result", stdout)
  })
})

//Close button
ipcMain.on('close', () => {
  app.quit()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})



