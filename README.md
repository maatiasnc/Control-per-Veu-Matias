
```markdown
# Control per Veu

Aplicació d'escriptori que permet controlar funcionalitats mitjançant comandes de veu en català. Desenvolupada amb Electron i Vue.js, aquesta aplicació demostra la integració del Web Speech API en un entorn d'escriptori per a una interfície d'usuari accessible i innovadora.

## Tecnologies Utilitzades

| Tecnologia | Versió | Propòsit |
|------------|---------|---------|
| **Electron** | 39.2.6 | Framework d'aplicacions d'escriptori |
| **Vue.js** | 3.5.21 | Framework frontend per a UI reactiva |
| **Vuetify** | 3.10.1 | Biblioteca de components Material Design |
| **Vite** | 7.1.5 | Eina de construcció i servidor de desenvolupament |
| **Vue Router** | 4.5.1 | Enrutament client-side |
| **Web Speech API** | - | Reconeixement de veu natiu del navegador |

## Instruccions d'Instal·lació i Execució

### Requisits previs
- Node.js (versió 18 o superior)
- npm, yarn, pnpm o bun

### Instal·lació
```bash
# Clonar el repositori
git clone https://github.com/maatiasnc/Control-per-Veu-Matias.git
cd Control-per-Veu-Matias

# Instal·lar dependències
npm install
```

### Execució en mode desenvolupament
```bash
npm run dev
```
Aquest comandament iniciarà simultàniament el servidor Vite (port 5173) i l'aplicació Electron amb recàrrega automàtica.

### Construcció per a producció
```bash
npm run build
```
Això generarà l'aplicació empaquetada a la carpeta `dist/`.

## Ús Bàsic de l'Aplicació

L'aplicació permet controlar funcions mitjançant comandes de veu en català:

### Comandes disponibles
- **"saluda"** - Mostra un missatge de benvinguda
- **"ajuda"** - Mostra les comandes disponibles
- **"mode fosc"** - Activa el tema fosc
- **"mode clar"** - Activa el tema clar
- **"esborra"** o **"borrar"** - Netetja la pantalla

### Com utilitzar
1. Inicia l'aplicació
2. Fes clic al botó d'activació de veu
3. Pronuncia una de les comandes en català
4. L'aplicació respondrà visualment a la teva comanda

## Estructura del Projecte

```
Control-per-Veu-Matias/
├── electron/
│   └── main.js          # Procés principal d'Electron
├── src/
│   ├── components/      # Components Vue automàticament importats
│   ├── pages/          # Pàgines de l'aplicació
│   └── main.js         # Punt d'entrada de Vue
├── package.json        # Dependències i scripts
└── README.md          # Aquest fitxer
```

## Llicència
MIT License
```

## Manual d'Usuari (MANUAL_USUARI.pdf)

### Estructura recomanada (1 pàgina):

**Títol:** Manual d'Usuari - Control per Veu

**Secció 1: Què és aquesta aplicació?**
- Explicació senzilla: "Una aplicació que escolta la teva veu per executar accions"
- Imatge de la interfície principal

**Secció 2: Començar a utilitzar-la**
1. "Obre l'aplicació fent doble clic"
2. "Prem el botó gran que diu 'Començar'"
3. "Parla clarament en català"
4. "L'aplicació respondrà immediatament"

**Secció 3: Comandes que pots dir**
- Llista visual amb icones:
  - 🗣️ "Digues 'saluda' per rebre un salutació"
  - 🌙 "Digues 'mode fosc' per canviar a fons fosc"
  - ☀️ "Digues 'mode clar' per canviar a fons clar"
  - 🧹 "Digues 'esborra' per netejar la pantalla"

**Secció 4: Consells**
- "Parla de manera natural i clara"
- "Assegura't que el micròfon funciona"
- "Si alguna cosa no funciona, prova a repetir la comanda"

## Notes

- El README actual del projecte és una plantilla genèrica de Vuetify que no reflecteix la funcionalitat real del projecte de control per veu [1](#0-0) .
- El projecte utilitza `concurrently` per executar tant el servidor Vite com Electron simultàniament en mode desenvolupament [2](#0-1) .
- La lògica de reconeixement de veu es troba a `src/pages/index.vue` i utilitza el Web Speech API amb configuració per a català (`ca-ES`) [3](#0-2) .
- Les comandes de veu es processen mitjançant un watcher que reacciona als canvis en el transcript reconegut [4](#0-3) .

Wiki pages you might want to explore:
- [Overview (maatiasnc/Control-per-Veu-Matias)](/wiki/maatiasnc/Control-per-Veu-Matias#1)

### Citations

**File:** README.md (L1-4)
```markdown
# Vuetify (Default)

This is the official scaffolding tool for Vuetify, designed to give you a head start in building your new Vuetify application. It sets up a base template with all the necessary configurations and standard directory structure, enabling you to begin development without the hassle of setting up the project from scratch.

```

**File:** package.json (L8-10)
```json
    "dev": "concurrently \"npm:dev:vite\" \"npm:dev:electron\"",
    "dev:vite": "vite",
    "dev:electron": "cross-env VITE_DEV_SERVER_URL=http://localhost:5173 electron .",
```

**File:** src/pages/index.vue (L13-20)
```vue
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;

if (Recognition) {
  recognition = new Recognition();
  recognition.lang = 'ca-ES';
  recognition.continuous = false; // Es para quan detecta una frase final
  recognition.interimResults = true;
```

**File:** src/pages/index.vue (L72-108)
```vue
watch(transcript, (newText) => {
  if (!newText) return;
  const command = newText.toLowerCase().trim();
  
  showSnackbar.value = false;

  if (command.includes('saluda')) {
    uiMessage.value = "Hola! Benvingut a l'aplicació.";
    statusColor.value = "success";
  } 
  else if (command.includes('ajuda')) {
    uiMessage.value = "Pots dir: 'Saluda', 'Mode fosc', 'Esborra'...";
    statusColor.value = "info";
  }
  else if (command.includes('esborra') || command.includes('borrar')) {
    uiMessage.value = "Esperant comanda...";
    statusColor.value = "primary";
  }
  else if (command.includes('mode fosc')) {
    theme.global.name.value = 'dark';
    uiMessage.value = "Mode fosc activat ";
    statusColor.value = "primary"; 
  }
  else if (command.includes('mode clar')) {
    theme.global.name.value = 'light';
    uiMessage.value = "Mode clar activat";
    statusColor.value = "primary";
  }
  else {
    uiMessage.value = `No he entès: "${newText}"`;
    statusColor.value = "warning";
    
    // Configuració Snackbar
    snackbarText.value = `Comanda desconeguda: "${newText}"`;
    showSnackbar.value = true;
  }
});
```
