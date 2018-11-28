<template>
  <v-card>
    <v-container
      fluid
      grid-list-md>
      <h3 class="text-xs-center display-2">Tus votaciones abiertas</h3>
      <v-layout row wrap>
      <v-flex xs4 :key="poll.id" v-for="poll in completedPolls">
        <PollCard :poll=poll :details=false />
      </v-flex>
      <v-flex xs4 :key="poll.id" v-for="poll in pendingPolls">
        <PollCard :poll=poll :details=false />
      </v-flex>
      </v-layout>
    </v-container>

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
      return this.polls.filter(poll => !this.participated(poll) && this.pollActive(poll));
    },
    pendingPolls() {
      return this.polls.filter(poll => this.participated(poll) && this.pollActive(poll));
    },
    closedPolls() {
      return this.polls.filter(poll => !this.pollActive(poll));
    },
  },
  methods: {
    changeSide() {
      this.side = !this.side;
    },
    async getUserPolls() {
      const loggedUser = await this.$auth.getUser();
      const user = await api.getUserByMail(loggedUser.email);
      this.polls = await api.getUserPolls(user.id);
    },
    participated(poll) {
      return (poll.vote_status === 'voted');
    },
    pollActive(poll){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
          dd = '0'+dd
      } 

      if(mm<10) {
          mm = '0'+mm
      } 

      today = yyyy + '/' + mm + '/' + dd;
      return new Date(today) < new Date(poll.close_date);
    },
  },
};
</script>
