<template>
  <v-card>
    <v-container
      fluid
      grid-list-lg>
      <h3 class="text-xs-center display-2">Historial</h3>
       <v-layout row wrap>
      <v-flex xs4 :key="poll.id" v-for="poll in closedPolls">
        <PollCard :poll=poll :details=false />
      </v-flex>
       </v-layout>
    </v-container>
  </v-card>
</template>


<script>
import api from '@/api';
import PollCard from '../components/PollCardResult.vue';

export default {
  components: {
    PollCard,
  },
  data() {
    return {
      side: false,
      polls: [],
    };
  },
  async created() {
    this.getUserPolls();
  },
  computed: {
    closedPolls() {
      return this.polls.filter(poll => !this.pollActive(poll));
    },
  },
  methods: {
    async getUserPolls() {
      this.polls = await api.getPolls();
    },
    pollActive(poll) {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1; // January is 0!
      const yyyy = today.getFullYear();

      if (dd < 10) {
        dd = `0${dd}`;
      }

      if (mm < 10) {
        mm = `0${mm}`;
      }

      today = `${yyyy}/${mm}/${dd}`;
      return new Date(today) < new Date(poll.close_date);
    },
  },
};
</script>
