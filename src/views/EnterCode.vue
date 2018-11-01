<template>
  <div class="container center-align">
    <h1>Ingresa el código de confimación:</h1>
    <div class="input-field">
      <input type="text" v-model="unique_code">
      <label>Código Unico</label>
    </div>
    <router-link
      v-show="unique_code"
      :to="`/vote/${unique_code}`"
      class="btn waves-effect waves-light"
    >
      Siguiente.
    </router-link>
  </div>
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
