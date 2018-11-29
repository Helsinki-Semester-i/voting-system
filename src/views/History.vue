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
    this.polls = await this.getPolls();
  },
  computed: {
    closedPolls() {
      return this.polls.filter(poll => !this.pollActive(poll));
    },
  },
  methods: {
    async getUserPolls() {
      const loggedUser = await this.$auth.getUser();
      const user = await api.getUserByMail(loggedUser.email);
      const userPolls = await api.getUserPolls(user.id);
      return userPolls;
    },
    async getPolls(){ //THIS COULD USE A REFACTOR
      const userPolls = await this.getUserPolls();
      const allPolls = await api.getPolls();
      let oldPolls = [];
      for(let i in allPolls){
        let repeated = false;
        for(let j in userPolls){
          if(allPolls[i].id === userPolls[j].id){
            repeated = true;
          }
        }
        if(!repeated){
          oldPolls.push(allPolls[i]);
        }
      }

      return userPolls.concat(oldPolls);
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
