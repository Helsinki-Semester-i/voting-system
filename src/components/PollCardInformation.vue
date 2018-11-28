<template>
  <v-flex xs12 >
    <v-card
    @click="selectPoll"
    :color="asignColor"
    class="white--text"
    >
      <v-card-title primary-title>
        <div>
          <div class="headline">{{poll.title}}</div>
          <span class="grey--text">
              <p v-if="pollActive">cierra el: {{poll.close_date}}</p>
              <p v-else>Cerró el: {{poll.close_date}}</p>
          </span>
        </div>
      </v-card-title>
      <v-divider light></v-divider>
      <v-card-actions align-end>
        <router-link v-if="available" :to="`/polls/${poll.id}`">
          <v-btn flat color="orange">
            Participar
          </v-btn>
        </router-link>
        <div v-else-if="participated">Ya participaste</div>
        <div v-else>No participastee</div>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="show">
          {{poll.description}}
        </v-card-text>
      </v-slide-y-transition>
    </v-card>
  </v-flex>
</template>


<style>
.votaciones{
  min-height: 200px
}

</style>


<script>
export default{
  data() {
    return {
      selected: false,
      show: false,
    };
  },
  props: {
    poll: {
      type: Object,
      required: true,
    },
    details: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    selectPoll() {
      this.selected = !this.selected;
    },
  },
  computed: {
    asignColor() {
      if (this.participated) {
        return 'red lighten-1';
      }
      return 'light-green lighten-1';
    },
    available() {
      return (this.participated === false) && this.pollActive;
    },
    participated() {
      return (this.poll.vote_status === 'voted');
    },
    pollActive(){
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
      return new Date(today) < new Date(this.poll.close_date);
    }
  },
};
</script>