<template>
  <v-card>
    <v-container
      fluid
      grid-list-md>
      <h3 class="text-xs-center">Tus votaciones abiertas</h3>
      <v-layout row wrap :key="poll.id" v-for="poll in completedPolls">
        <PollCard :poll=poll :details=false />
      </v-layout>
      <v-layout row wrap :key="poll.id" v-for="poll in pendingPolls">
        <PollCard :poll=poll :details=false />
      </v-layout>
    </v-container>

    <v-container
      fluid
      grid-list-lg>
      <h3 class="text-xs-center">Historial</h3>
      <v-layout row wrap :key="poll.id" v-for="poll in closedPolls">
        <PollCard :poll=poll :details=false />
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import api from '@/api';
import PollCard from '../components/PollCardInformation.vue';

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
    completedPolls() {
      return this.polls.filter(poll => !poll.participation && poll.active);
    },
    pendingPolls() {
      return this.polls.filter(poll => poll.participation && poll.active);
    },
    closedPolls() {
      return this.polls.filter(poll => !poll.active);
    },
  },
  methods: {
    changeSide() {
      this.side = !this.side;
    },
    async getUserPolls() {
      this.polls = await api.test_getUserPolls();
    },
  },
};
</script>
