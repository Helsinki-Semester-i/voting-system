<template>
  <div>
    <div>
      <p>{{poll}}</p>
    </div>
  </div>
</template>

<script>

import api from '@/api';

export default {
  data() {
    return {
      poll: {},
    };
  },
  async created() {
    this.getPollData();
  },
  methods: {
    async getPollData() {
      let id = this.$route.params.id;
      //console.log(id);
      this.poll = await api.test_getSinglePoll();
    },
  },
};
</script>
