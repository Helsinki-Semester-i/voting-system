<template>
<v-card>
    <v-container
      fluid
      grid-list-md>
      <h3 class="text-xs-center display-2">{{poll.title}}</h3>
      <br />
      <h4 class="text-xs-center display-1">
        Abierta de {{cleanDate(poll.creation_date)}} a {{cleanDate(poll.close_date)}}
      </h4>
      <br />
      <h4 class="text-xs-center display-1">
        La votación {{poll.accepted ? '' : 'no '}}fue aceptada.
      </h4>
      <br />
      <p class="text-xs-center">{{poll.details}}</p>
      <v-layout row wrap>
        <vote-chart
          :chart-data="getAnswersForChart(poll.questions)"
        ></vote-chart>
      </v-layout>
    </v-container>
    <div class="text-xs-center">
      <router-link :to="'/vote'">
        <v-btn round color="primary" dark>
          Click aquí para introducir tu código.
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
      poll: {
        creation_date: '',
        close_date: '',
        questions: [{
          question: '',
          vote_count: 0,
        }],
      },
    };
  },
  async created() {
    this.getResultData();
  },
  methods: {
    async getResultData() {
      const { id } = this.$route.params;
      this.poll = await api.getPollResults(id);
    },
    getAnswersForChart(answers) {
      return answers.map(answer => [answer.question, answer.vote_count]);
    },
    cleanDate(date) {
      let result = '';
      /* eslint-disable */
      for (const i in date) {
        if (date.charAt(i) === 'T') {
          return result;
        }
        result += date.charAt(i);
      }
      return date;
    },
  },
};
</script>
