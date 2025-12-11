// A src/background.js o main.js
const { session } = require('electron')

// Afegeix això dins de la funció createWindow() o al final d'aquesta:
session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
  const allowedPermissions = ['media'] // 'media' inclou micròfon i càmera

  if (allowedPermissions.includes(permission)) {
    // Aprova automàticament la sol·licitud
    callback(true)
  } else {
    // Denega altres permisos
    callback(false)
  }
})
