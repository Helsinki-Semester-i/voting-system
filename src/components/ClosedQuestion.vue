<template>
    <v-card>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
           <h5 class="headline ">{{question.question}}</h5>
             <v-radio-group class=" font-weight-medium align-start white black--text" v-model="selectedAnswer" @click="selectAnswer(selectedAnswer)">
              <v-radio 
              v-for="(answer, index) in question.options" :key="index"
               :label ="answer.option_text" :value="answer.order_priority" >
              </v-radio>
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
    index:{
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
    };
  },
  methods:{
    selectAnswer(value){
      this.$emit('changeAnswer',this.index,value);
    }
  }
};
</script>
