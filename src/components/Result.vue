<template>
  <div>
    <p>{{poll}}</p>
    <router-link :to="`/unique_code/${poll.id}`" class="btn waves-effect waves-light">
      Click Here to Enter your Unique Code.
    </router-link>
  </div>
</template>

<script>
import api from "@/api";

export default {
  //   components: {
  //     ,
  //   },
  data() {
    return {
      poll: {}
    };
  },
  async created() {
    this.getResultData();
  },
  computed: {
    questions() {
      return this.poll.questions;
    }
  },
  methods: {
    async getResultData() {
      const id = this.$route.params.id;
      this.poll = await api.test_getSinglePoll();
    }
  }
};
</script>
