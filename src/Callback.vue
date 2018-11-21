<template>
<div>hi</div>
</template>

<script>
export default {
  name: 'ImplicitCallback',
  async beforeMount() {
    await this.$auth.handleAuthentication();
    const newPath = this.$auth.getFromUri();
    this.$router.push({ path: '/' });
    console.log('asda: ', newPath);
  },
};
</script>
