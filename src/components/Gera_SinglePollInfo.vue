<template>
  <div>
    <div>
      <p>
        <router-link :to="`/poll/${poll.id}`">
          {{poll.description}}
        </router-link>
      </p>
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
      this.poll = await api.test_getSinglePoll();
    },
  },
};
</script>
