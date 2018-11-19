<template>
  <v-flex xs12 sm6 offset-sm3>
    <v-card
    @click="selectPoll"
    :color="asignColor"
    class="white--text"
    >
      <v-card-title primary-title>
        <div>
          <div class="headline">{{poll.title}}</div>
          <span class="grey--text">
              <p v-if="poll.active">cierra el: {{poll.closeDate}}</p>
              <p v-else>Cerró el: {{poll.closeDate}}</p>
          </span>
        </div>
      </v-card-title>
      <v-divider light></v-divider>
      <v-card-actions>
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
      if (this.poll.participation) {
        return 'pink darken-4';
      }
      return 'deep-purple darken-1';
    },
    available() {
      return !this.poll.participation && this.poll.active;
    },
    participated() {
      return this.poll.participation;
    },
  },
};
</script>
