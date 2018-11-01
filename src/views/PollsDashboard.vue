<template>
  <div>
    <div class="section container">
      <h1 class="center-align section">Tus votaciones abiertas</h1>
      <div :key="poll.id" v-for="poll in completedPolls">
        <PollCard :poll=poll :details=false />
      </div>
      <div :key="poll.id" v-for="poll in pendingPolls">
        <PollCard :poll=poll :details=false />
      </div>
    </div>
    <br/><br/><br/>
    <div class="divider"></div>
    <div class="section container">
      <h1 class="center-align section">Historial</h1>
      <div :key="poll.id" v-for="poll in closedPolls">
        <PollCard :poll=poll :details=false />
      </div>
    </div>
  </div>
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
