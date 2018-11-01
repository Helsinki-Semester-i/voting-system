<template>
  <div class="container center-align">
    <h1>{{poll.title}}</h1>
    <vote-chart
      :key="question.id"
      v-for="question in questions"
      :title="question.question"
      :chart-data="getAnswersForChart(question.answers)"
    ></vote-chart>
    <br />
    <router-link :to="'/vote'" class="btn waves-effect waves-light">
      Click Here to Enter your Unique Code.
    </router-link>
  </div>
</template>

<script>
import api from '@/api';
import VoteChart from './VoteChart.vue';

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
