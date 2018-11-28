<template>
  <v-container wrap align-center>
    <v-layout row wrap align-center justify-center>
      <v-card>
        <div class="text-xs-center">
          <v-alert
            :value="copySuccess"
            type="success"
            dismissible
            outline
          >You copied {{code}} to the clipboard</v-alert>
          <v-alert
            :value="copyError"
            type="error"
            dismissible
            outline
          >Failed to copy</v-alert>
          <v-card-text primary-title>
            <h2 class="display-3">Gracias por participar.</h2>
          </v-card-text>
          <v-card-media>
            <img
            src="../assets/green_check.png"
            alt="Green Check">
          </v-card-media>
          <v-card-text>
            <h4 class="display-1">Guarda este código, desaparecerá al continuar.</h4>
            <h4 class="display-1">Es necesario para verificar tu voto al finalizar la votación</h4>
            <br> <v-divider></v-divider> <br>
            <h1 class="display-4">
              <v-btn
              flat large color="info"
              v-clipboard:copy="this.code"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              ><h1 class="display-4">{{code}}</h1></v-btn>
            </h1>
            <br> <v-divider></v-divider>
            <v-btn
              to="/"
            >Continuar</v-btn>
          </v-card-text>
        </div>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // code = 'AGHAYWE',
      copyError: false,
      copySuccess: false,
    };
  },
  methods: {
    onCopy() {
      this.copySuccess = true;
    },
    onError() {
      this.copyError = true;
    },
  },
};
</script>
