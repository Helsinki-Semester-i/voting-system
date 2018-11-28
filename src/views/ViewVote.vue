<template>
  <v-container wrap align-center>
    <v-layout align-center>
      <v-flex xs6 offset-xs2>
        <v-form>
          <h2 class="display-3">Vote for Code: {{result.unique_code}}</h2>
          <h3 class="display-2">{{result.poll.title}}</h3>
          <h5 class="headline">{{result.poll.details}}</h5>
          <p class="subheading">{{result.date}}</p>
          <div v-for="(vote, index) in this.result.poll.questions" :key="index">
            <closed-question
              :question="vote"
              :index="index"
              :disabled="true"
              :checked-answer="getCheckedAnswer(vote.options)"
              :view-as-result="true"
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
      let response = await api.getVoteByCode(this.$route.params.unique_code);
      if(response.poll){
        this.result = response;
      }
    },
    getCheckedAnswer(options){
      console.log("Checking");
      console.log(options);
      for(var i in options){
        if(options[i].chosen === true){
          console.log(options[i].order_priority);
          return options[i].order_priority;
        }
      }
      return null;
    }
  },
};
</script>
