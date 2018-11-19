<template>
  <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline">{{title}}</h3>
        </div>
      </v-card-title>
      <v-divider light></v-divider>
      <v-card-text>
        <h5 class="subheading">Winner:<br/>{{winner}}</h5>
      </v-card-text>
      <v-card-media>
        <pie-chart :data="chartData"></pie-chart>
      </v-card-media>
    </v-card>
  </v-flex>
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
