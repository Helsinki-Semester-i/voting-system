<template>
<v-card>
    <v-container
      fluid
      grid-list-md>
      <h3 class="text-xs-center display-2">{{poll.title}}</h3>
      <v-layout row wrap
        :key="question.id"
        v-for="question in questions">
        <vote-chart
          :title="question.question"
          :chart-data="getAnswersForChart(question.answers)"
        ></vote-chart>
      </v-layout>
    </v-container>
    <div class="text-xs-center">
      <router-link :to="'/vote'">
        <v-btn round color="primary" dark>
          Click Here to Enter your Unique Code.
        </v-btn>
      </router-link>
    </div>
</v-card>
</template>

<script>
import api from '@/api';
import VoteChart from '../components/VoteChart.vue';

export default {
  components: {
    VoteChart,
  },
  data() {
    return {
      poll: {},
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
