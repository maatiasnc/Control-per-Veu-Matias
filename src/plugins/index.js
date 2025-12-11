/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

import { registerRouter } from './router'
import { registerVuetify } from './vuetify'

export function registerPlugins (app) {
  registerRouter(app)
  registerVuetify(app)
}