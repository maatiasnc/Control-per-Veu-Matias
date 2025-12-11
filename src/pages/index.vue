<script setup>
import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';

// ==========================================
// 1. LÒGICA DEL RECONEIXEMENT DE VEU
// ==========================================
const isListening = ref(false);
const transcript = ref('');
const interimTranscript = ref('');
const error = ref(null);

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;

if (Recognition) {
  recognition = new Recognition();
  recognition.lang = 'ca-ES';
  recognition.continuous = false; // Es para quan detecta una frase final
  recognition.interimResults = true;

  recognition.onstart = () => {
    isListening.value = true;
    error.value = null;
    interimTranscript.value = '';
    transcript.value = '';
  };

  recognition.onend = () => {
    isListening.value = false;
  };

  recognition.onerror = (event) => {
    isListening.value = false;
    error.value = event.error;
  };

  recognition.onresult = (event) => {
    let finalChunk = '';
    let interimChunk = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalChunk += event.results[i][0].transcript;
      } else {
        interimChunk += event.results[i][0].transcript;
      }
    }
    // Només actualitzem si hi ha un resultat final per processar la comanda
    if (finalChunk) transcript.value = finalChunk;
    interimTranscript.value = interimChunk;
  };
} else {
  error.value = "El navegador no suporta Speech API";
}

const start = () => {
  if (recognition) recognition.start();
};

// ==========================================
// 2. LÒGICA VISUAL I DE COMANDES
// ==========================================

const theme = useTheme();
const uiMessage = ref("Prem el botó per començar...");
const statusColor = ref("primary");

const showSnackbar = ref(false);
const snackbarText = ref("");

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
</script>

<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card width="400" :color="statusColor" variant="tonal">
      <v-card-item>
        <v-card-title class="text-h5 text-center">Control per Veu</v-card-title>
      </v-card-item>

      <v-card-text class="text-center py-4">
        <div class="mb-4">
          <v-icon 
            :icon="isListening ? 'mdi-microphone' : 'mdi-microphone-off'" 
            size="64"
            :class="{'text-red animate-pulse': isListening}"
          ></v-icon>
        </div>
        
        <p class="text-h6 font-weight-bold">
          {{ isListening ? 'Escoltant...' : 'En espera' }}
        </p>
        
        <p v-if="interimTranscript" class="text-caption text-grey">
            Detectant: {{ interimTranscript }}
        </p>
        
        <p class="mt-4 text-h6">{{ uiMessage }}</p>
        
        <v-alert v-if="error" type="error" class="mt-3" density="compact">
          {{ error }}
        </v-alert>
      </v-card-text>

      <v-card-actions class="justify-center pb-4">
        <v-btn 
          variant="elevated" 
          color="primary" 
          size="large"
          @click="start" 
          :disabled="isListening"
        >
          {{ isListening ? 'Parlant...' : 'Escolta' }}
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar
      v-model="showSnackbar"
      color="error"
      timeout="3000"
      location="bottom"
    >
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn variant="text" @click="showSnackbar = false">Tancar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.animate-pulse { animation: pulse 1.5s infinite; }

@keyframes pulse {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
}
</style>