/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  // Opcions de configuració de Vuetify
})

export function registerVuetify(app) {
  app.use(vuetify)
}