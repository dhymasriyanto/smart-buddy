const { app, BrowserWindow, screen } = require('electron')
const { ipcMain } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 256,
    height: 256,
    minHeight: 256,
    minWidth: 256,
    maxHeight: 256,
    maxWidth: 256,
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    resizable: false,
    skipTaskbar: true,
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
    // win.setBounds({
    //   x: x,
    //   y: y,
    //   width: 256,
    //   height: 256,
    // })
    dragStartX = x
    dragStartY = y
  })

  ipcMain.on('move-window', (event, { dx, dy }) => {
    const win = BrowserWindow.fromWebContents(event.sender)

    if (!win) return

    // TODO: bikin kodingan boundary di bawah jadi lebih ringkas.

    let mouseX = dragStartX + dx
    let mouseY = dragStartY + dy

    const taskbar = screen.getPrimaryDisplay().bounds.height - screen.getPrimaryDisplay().workArea.height

    const boundLeft = screen.getPrimaryDisplay().workArea.x
    const boundRight = screen.getPrimaryDisplay().workArea.width - win.getBounds().width
    const boundTop = screen.getPrimaryDisplay().workArea.y
    const boundBottom = screen.getPrimaryDisplay().workArea.height - win.getBounds().height + taskbar

    if (mouseX <= boundLeft) mouseX = boundLeft
    if (mouseX >= boundRight) mouseX = boundRight
    if (mouseY <= boundTop) mouseY = boundTop
    if (mouseY >= boundBottom) mouseY = boundBottom
   
    // how to dont resize when move window?
    // 
    // TODO; kita akan membuat drag mouse itu ga boleh ngelebihi area screen kita [done]
    // TODO: gimana caranya supaya mungkin jarak atas kanan kiri itu lebih dekat (kecuali memang ada menu yang muncul)
    // animasi gravitasi.ketika kita drag si karakter lebih tinggi dari bottom screen.
    
    win.setBounds({
      x: Math.round(mouseX),
      y: Math.round(mouseY),
      width: 256,
      height: 256,  
    })
  })

  ipcMain.on('walk', (event, { x }) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    
    if (!win) return

    win.setBounds({
      x: x,
      width: 256,
      height: 256
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
