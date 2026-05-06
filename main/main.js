const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    minHeight: 300,
    minWidth: 300,
    maxHeight: 300,
    maxWidth: 300,
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

app.disableHardwareAcceleration()

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')

  let dragStartX = 0, dragStartY = 0

  ipcMain.on('start-drag', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return
    const [x, y] = win.getPosition()
    win.setBounds({
      x: x,
      y: y,
      width: 300,
      height: 300,
    })
    dragStartX = x
    dragStartY = y
  })

  ipcMain.on('move-window', (event, { dx, dy }) => {
    const win = BrowserWindow.fromWebContents(event.sender)

    if (!win) return

    // how to dont resize when move window?
    
    win.setBounds({
      x: Math.round(dragStartX + dx),
      y: Math.round(dragStartY + dy),
      width: 300,
      height: 300,  
    })
  })

  ipcMain.on('walk', (event, { x }) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    
    if (!win) return

    win.setBounds({
      x: x,
      width: 300,
      height: 300
    })
  })
  
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
})
