<template>
  <v-container wrap align-center>
    <v-layout align-center>
      <v-flex xs6 offset-xs2>
        <v-form>
          <h2 class="display-3">Vote for Code: {{result.unique_code}}</h2>
          <h3 class="display-2">{{result.poll.title}}</h3>
          <h5 class="headline">{{result.poll.description}}</h5>
          <p class="subheading">{{result.date}}</p>
          <div v-for="vote in result.votes" :key="vote.question.id">
            <closed-question
              :question="vote.question"
              :disabled="true"
              :checked-answer="vote.answer_id"
            />
          </div>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
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
      result: {
        poll: {},
      },
    };
  },
  async created() {
    this.getVoteData();
  },
  methods: {
    async getVoteData() {
      this.result = await api.test_getVote(this.$route.params.unique_code);
    },
  },
};
</script>
