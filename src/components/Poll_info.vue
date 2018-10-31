<template>
    <div v-bind:class="asignColor" @click="selectPoll">
        <h5>{{poll.title}}</h5>
        <div class="right-align">Se cierra el: {{poll.closeDate}}</div>
        <div v-if="selected">
            {{poll.description}}
            <div class="center-align" v-if="available" @click="goToQuestions"><a class="waves-effect waves-light btn-small">Participar</a></div>
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
    goToQuestions() {
      console.log(this.poll.id);
    },
  },
  computed: {
    asignColor() {
      if (this.poll.participation) {
        return 'card-panel light-green lighten-4 hoverable';
      }
      return 'card-panel purple lighten-3 hoverable';
    },
    available() {
      return !this.poll.participation && this.poll.active;
    },
  },
};
</script>
<style scoped>
</style>
