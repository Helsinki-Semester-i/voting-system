<template>
  <div>
    <h1>{{poll.title}}</h1>
    <pie-chart
      :key="question.id"
      v-for="question in questions"
      :data="getAnswersForChart(question.answers)">
    </pie-chart>
    <router-link :to="`/unique_code/${poll.id}`" class="btn waves-effect waves-light">
      Click Here to Enter your Unique Code.
    </router-link>
  </div>
</template>

<script>
import api from '@/api';

export default {
  // components: {
  //   PieChart: VueChartkick,
  // },
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
      // return [['Blueberry', 44], ['Strawberry', 23]];
    },
  },
};
</script>
