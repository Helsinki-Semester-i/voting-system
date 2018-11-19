<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 offset-xs2>
        <h1>Ingresa el código de confimación:</h1>
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
          <v-btn>Siguiente.</v-btn>
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
  async created() {
    this.getResultData();
  },
  computed: {
    questions() {
      return this.poll.questions;
    },
  },
  methods: {
    async getResultData() {
      const { id } = this.$route.params;
      this.poll = await api.test_getPollResults(id);
    },
    getAnswersForChart(answers) {
      return answers.map(answer => [answer.text, answer.votes]);
    },
  },
};
</script>
