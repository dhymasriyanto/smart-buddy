const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
    },
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')

  ipcMain.on('move-window', (event, { x, y }) => {
    const win = BrowserWindow.fromWebContents(event.sender)

    win.setPosition(x, y)
  })
  
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
})
