<template>
  <div v-bind:class="asignColor" @click="selectPoll">
    <div class="row">
      <div class="col s9">
        <h5>{{poll.title}}</h5>
      </div>
      <div class="col s3">
        <div class="right-align">
          <div v-if="poll.active">
            Se cierra el: {{poll.closeDate}}
          </div>
          <div v-else>
            Cerró el: {{poll.closeDate}}
          </div>
        </div>
      </div>
    </div>
    <div class="center-align" v-if="selected">
      <div class="container left-align">{{poll.description}}</div>
      <div v-if="available">
        <br />
        <router-link :to="`/polls/${poll.id}`" class="waves-effect waves-light btn-small">
          Participar
        </router-link>
      </div>
      <div v-else-if="participated">
        <br />
        Ya participaste
      </div>
      <div v-else>
        No participaste
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data() {
    return {
      selected: false,
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
        return 'card-panel purple lighten-5 hoverable';
      }
      return 'card-panel purple lighten-3 hoverable';
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
