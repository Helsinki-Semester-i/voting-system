<template>
    <v-card>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-radio-group class=" font-weight-medium align-start white black--text" v-model="selectedAnswer">
           <h5 class="headline ">{{question.question}}</h5>
            <v-layout v-for="(answer, index) in question.options" :key="index">
              <v-radio :label ="answer.option_text" :value="index" :disabled="disabled">
              </v-radio>
            </v-layout>
          </v-radio-group>
          </v-layout>
        </v-container>
      </v-card>
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
