// electron/preload.js
const { contextBridge, ipcRenderer } = require('electron')

// Todas las API de Node.js están disponibles en el proceso de precarga.
// Tiene el mismo sandbox que una extensión de Chrome.
// Aquí puedes exponer APIs de forma segura al proceso de renderizado.

// Expone una API llamada 'electronAPI' al proceso de renderizado (window.electronAPI)
contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
})