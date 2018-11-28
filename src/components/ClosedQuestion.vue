<template>
  <v-card>
    <v-container fluid grid-list-md>
      <h5 class="headline ">{{question.question}}</h5>
      <v-layout row wrap>
        <v-radio-group class=" font-weight-medium align-start white black--text"
          v-model="selectedAnswer"
          @click="selectAnswer(selectedAnswer)"
        >
          <v-radio
            v-for="(answer, index) in question.options" :key="index"
            :label ="answer.option_text" :value="answer.order_priority" >
          </v-radio>
        </v-radio-group>
      </v-layout>
      <v-checkbox
      :label="`Anular Voto: ${nullVote.toString()}`"
      v-model="nullVote"
      ></v-checkbox>
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
    index: {
      type: Number,
      required: true,
    },
    checkedAnswer: {
      type: String,
    },
  },
  data() {
    return {
      selectedAnswer: this.checkedAnswer,
      nullVote: false,
    };
  },
  methods: {
    selectAnswer(value) {
      if (this.nullVote) {
        this.$emit('changeAnswer', this.index, null);
      }
      this.$emit('changeAnswer', this.index, value);
    },
  },
};
</script>
