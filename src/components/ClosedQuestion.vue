<template>
  <v-radio-group v-model="selectedAnswer">
    <h5 class="headline">{{question.question}}</h5>
    <v-radio v-for="(answer, index) in question.answers" :key="index"
    :label="answer"
    :value="index"
    :disabled="disabled"
    >
    </v-radio>
  </v-radio-group>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
    },
    checkedAnswer: {
      type: String,
    },
  },
  data() {
    return {
      selectedAnswer: this.checkedAnswer,
    };
  },
};
</script>
