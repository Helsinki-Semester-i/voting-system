<template>
  <div>
    <div class="container">
      <h2>{{poll.title}}</h2>

      <div :key="question.id" v-for="question in questions">
        <h5>{{question.question}}</h5>
        <form action="#">
          <p :key="index" v-for="(answer, index) in question.answers">
            <label>
              <input :name="question.id" type="radio" />
              <span>{{answer}}</span>
            </label>            
          </p>
        </form>
      </div>

    <button class="btn waves-effect waves-light" type="submit" name="action">
      Submit          
    </button>
        

    </div>
  </div>
</template>

<script>

import api from '@/api';

export default {
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
