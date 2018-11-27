<template>
  <div>
    <h5>{{question.question}}</h5>
    <form action="#">
      <p v-for="(answer, index) in question.answers" :key="index">
        <label>
          <input v-if="checkedAnswer == index" checked
          :name="question.id" type="radio" :disabled="disabled" />
          <input v-else :name="question.id" type="radio" :disabled="disabled" />
          <span>{{answer}}</span>
        </label>
      </p>
    </form>
  </div>
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
      type: Number,
    },
  },
};
</script>
