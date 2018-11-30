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
          <span >
              <p class="red darken-4"
                v-if="pollActive">
                cierra el: {{cleanDate(poll.close_date)}}
              </p>
              <p v-else>Cerró el: {{cleanDate(poll.close_date)}}</p>
          </span>
        </div>
      </v-card-title>
      <v-divider light></v-divider>
      <v-card-actions align-end>
        <router-link v-if="available" :to="`/pollsDemo/${poll.id}`">
          <v-btn flat color="orange">
            Participar
          </v-btn>
        </router-link>
        <div v-else-if="participated">Ya participaste</div>
        <div v-else>No participastee</div>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="show">
          {{poll.details}}
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
    cleanDate(date) {
      let result = ' ';
      for (let i = 0; i < date.length; i += 1) {
        if (date.charAt(i) === 'T') {
          return result;
        }
        result += date.charAt(i);
      }
      return date;
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
    pollActive() {
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
      return new Date(today) < new Date(this.poll.close_date);
    },
  },
};
</script>
