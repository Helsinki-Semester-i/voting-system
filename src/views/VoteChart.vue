<template>
  <div>
    <h2>{{title}}</h2>
    <div class="row valign-wrapper center-align">
      <div class="col s6">
        <h3>Winner:<br/>{{winner}}</h3>
      </div>
      <div class="col s6">
        <pie-chart :data="chartData"></pie-chart>
      </div>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script>
export default {
  computed: {
    winner() {
      return this.chartData.reduce((a, b) => (a[1] > b[1] ? a : b))[0];
    },
  },
  props: {
    title: {
      type: String,
    },
    chartData: {
      type: Array,
      required: true,
    },
  },
};
</script>
