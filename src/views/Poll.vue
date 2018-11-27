<template>
  <div>
    <div class="container">
      <h2>{{poll.title}}</h2>
      <div v-for="question in questions" :key="question.id">
        <closed-question :question="question" :disabled="false" />
      </div>
      <router-link to="/displaycode" class="btn waves-effect waves-light" >
        Submit
      </router-link>
    </div>
  </div>
</template>

<script>

import api from '@/api';
import ClosedQuestion from '../components/ClosedQuestion.vue';

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
      const { id } = this.$route.params;
      this.poll = await api.test_getSinglePoll(id);
      this.questions = this.poll.questions;
    },
  },
  watch: {
    loadingDialog(val) {
      if (!val) return;
      setTimeout( async () => {
        this.loadingDialog = false;
        let data = await api.submitVote(this.poll);
        console.log("Vote submited with code " + data);
        this.$router.push({ path: '/displaycode' });
      }, 4000);
    },
  },

};
</script>
