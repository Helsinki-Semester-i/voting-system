<template>
  <div class="hero">
    <div>
      <h1 class="display-3">You are:</h1>
      <p class="lead">{{activeUser}}</p>
    </div>
    <br>
    <div>
      <h1 class="display-3" v-show="loading">Loading...</h1>
      <p class="lead">{{parts}}</p>
    </div>
  </div>
</template>

<script>
import api from '@/api';

export default {
  data() {
    return {
      activeUser: null,
      parts: [],
      loading: false,
    };
  },
  methods: {
    async refreshInfo() {
      this.loading = true;
      this.parts = await api.getParts();
      this.loading = false;
    },
  },
  async created() {
    this.activeUser = await this.$auth.getUser();
    this.refreshInfo();
  },
};
</script>

<style>
  .hero {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .hero .lead {
    font-weight: 200;
    font-size: 1.5rem;
  }
</style>
