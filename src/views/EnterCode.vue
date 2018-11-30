<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 offset-xs2>
        <h4 class="display-1">Ingresa el código único de tu voto:</h4>
        <v-form>
          <v-text-field
            v-model="unique_code"
            label="Código Unico"
            required
          ></v-text-field>
          <router-link
            v-show="unique_code"
            :to="`/vote/${unique_code}`"
          >
          <v-btn>Siguiente</v-btn>
          </router-link>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import api from '@/api';

export default {
  data() {
    return {
      unique_code: null,
    };
  },
};
</script>
