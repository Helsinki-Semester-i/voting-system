<template>
  <div>
    <div class="container">
      <h2>{{poll.title}}</h2>
      <div v-for="question in questions" :key="question.id">
        <closed-question :question="question" :disabled="false" />
      </div>
      <button class="btn waves-effect waves-light" type="submit" name="action">
        Submit
      </button>
    </div>
  </div>
</template>

<script>

import api from '@/api';
import ClosedQuestion from './ClosedQuestion.vue';

export default {
  components: {
    ClosedQuestion,
  },
  data() {
    return {
      poll: {},
      questions: [],
    };
  },
  async created() {
    this.getPollData();
  },
  methods: {
    async getPollData() {
      // const id = this.$route.params.id;
      // console.log(id);
      this.poll = await api.test_getSinglePoll();
      this.questions = this.poll.questions;
    },
  },
};
</script>
