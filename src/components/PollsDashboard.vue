<template>
  <div class="row">
    <div v-if="side">
      <div class="col s1">
        <div class="waves-effect waves-light btn blue lighten-2"
        style="min-height: 100vh; width: 7vw" @click="changeSide">
        </div>
      </div>
      <div class="col s11">
        <h1 class="center-align">Tus votaciones abiertas</h1>
        <div :key="poll.id" v-for="poll in completedPolls">
          <PollCard :poll=poll :details=false />
        </div>
        <div :key="poll.id" v-for="poll in pendingPolls">
          <PollCard :poll=poll :details=false />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="col s11">
        <h1 class="center-align">Historial</h1>
        <div :key="poll.id" v-for="poll in closedPolls">
          <PollCard :poll=poll :details=false />
        </div>
      </div>
      <div class="col s1">
        <div class="waves-effect waves-light btn blue lighten-2"
        style="min-height: 100vh; width: 7vw" @click="changeSide">
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import api from '@/api';
import PollCard from './PollCardInformation.vue';

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
