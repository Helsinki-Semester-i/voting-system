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
      <!-- LISTAR OPCIONES -->
      <v-layout :key="option.id" v-for="(option, index) in options">
        <v-container grid-list-sm>
          <v-layout row justify-space-between>
            <v-flex xs2>
              <v-text-field
                v-model="option.value"
                label="Valor"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs8>
              <v-text-field
                v-model="option.option"
                :counter="30"
                label="Opción"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-btn flat small color="error" @click="deleteOption(index)">Borrar</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      <!-- FIN LISTAR OPCIONES -->
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength} from 'vuelidate/lib/validators';
import api from '@/api';

export default {
  mixins: [validationMixin],
  validations: {
    question: { required, maxLength: maxLength(50) },
    //option: { required, maxLength: maxLength(30) },
    //value: {required},
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
    /* optionErrors() {
      const errors = [];
      if (!this.$v.option.$dirty) return errors;
      if (!this.$v.option.maxLength) errors.push('El texto de la opción debe de ser maximo de 30 caracteres.');
      if (!this.$v.option.required) errors.push('El texto de la opción es requerido.');
      return errors;
    },
    valueErrors(){
        const errors = [];
        if (!this.$v.value.$dirty) return errors;
        if (!this.$v.value.required) errors.push('El valor de la opción es requerido.');
        return errors;
    }, */
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
        this.$delete(this.options, index);
    },
  },
};
</script>