<template>
  <v-container>
      <v-form>
          <v-container fluid grid-list-md>
              <v-layout row justify-space-between>
                <v-flex xs10>
                    <v-text-field
                        v-model="question"
                        :error-messages="questionErrors"
                        :counter="50"
                        label="Premisa"
                        required
                        @input="$v.question.$touch()"
                        @blur="$v.question.$touch()"
                    ></v-text-field>
                </v-flex>
                <v-flex xs2>
                    <v-btn column flat small @click="createOption">Crear</v-btn>
                    <v-btn flat small color="error">Borrar</v-btn>
                </v-flex>
              </v-layout>
          </v-container>
          <v-layout :key="option.id" v-for="(option, index) in options">
            <create-closed-option :option=option.option :value=index :index=index @deleteClick="deleteOption"></create-closed-option>
          </v-layout>
      </v-form>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength} from 'vuelidate/lib/validators';
import CreateClosedOption from '../components/CreateClosedOption.vue';
import api from '@/api';

export default {
  mixins: [validationMixin],
  components: {
    CreateClosedOption,
  },
  validations: {
    question: { required, maxLength: maxLength(50) },
  },

  data() {
    return {
        question: '',
        options: [
            {'option': 'Muy en contra',
            'value': 1},
            {'option': 'En contra',
            'value': 2},
            {'option': 'Neutral',
            'value': 3},
            {'option': 'A favor',
            'value': 4},
            {'option': 'Muy a favor',
            'value': 5},
        ]
    };
  },

  computed: {
    questionErrors() {
      const errors = [];
      if (!this.$v.question.$dirty) return errors;
      if (!this.$v.question.maxLength) errors.push('La premisa debe de ser maximo de 50 caracteres.');
      if (!this.$v.question.required) errors.push('La premisa es requerida.');
      return errors;
    },
  },

  methods: {
    async submit() {
      this.$v.$touch();
      this.loading = true;
      this.response = {'question': this.question}; //CALL API
      this.clear();
      this.loading = false;
    },
    clear() {
        this.$v.$reset();
    },
    createOption(){
        const newOption = {'option': '','value': 0};
        this.options.push(newOption);
    },
    deleteOption(index){
        console.log(this.options[index].option);
        this.options.splice(index, 1);
    }
  },
};
</script>