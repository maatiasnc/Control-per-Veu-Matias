// electron/main.js
import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

// Desactiva la aceleración de hardware si da problemas de renderizado
app.disableHardwareAcceleration()

// Polyfill for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let win

const createWindow = () => {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      // Importante para seguridad y comunicación
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, 
    },
  })

  // En desarrollo carga la URL de Vite, en producción carga el index.html compilado
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    // Abre las herramientas de desarrollo (F12) automáticamente en dev
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(() => {
  // Escucha el evento 'get-app-version' y devuelve la versión de la app
  ipcMain.handle('get-app-version', () => {
    return app.getVersion()
  })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})