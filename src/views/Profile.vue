<template>
  <div class="hero">
    <div>
      <h1 class="display-3">You are:</h1>
      <p class="lead">{{activeUser}}</p>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeUser: null,
    };
  },
  async created() {
    this.activeUser = await this.$auth.getUser();
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