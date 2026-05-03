const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
})

contextBridge.exposeInMainWorld('api', {
  startDrag: () => ipcRenderer.send('start-drag'),
  moveWindow: (dx, dy) => ipcRenderer.send('move-window', {dx, dy}) 
})
