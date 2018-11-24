<template>
  <v-container grid-list-sm>
      <v-form>
        <v-layout row justify-space-between>
            <v-flex xs2>
                <v-text-field
                    v-model="localValue"
                    :error-messages="valueErrors"
                    label="Valor"
                    required
                    @input="$v.localValue.$touch()"
                    @blur="$v.localValue.$touch()"
                ></v-text-field>
            </v-flex>
            <v-flex xs8>
                <v-text-field
                    v-model="localOption"
                    :error-messages="optionErrors"
                    :counter="30"
                    label="Opción"
                    required
                    @input="$v.localOption.$touch()"
                    @blur="$v.localOption.$touch()"
                ></v-text-field>
            </v-flex>
            <v-flex xs2>
                <v-btn flat small color="error" @click="deleteClick">Borrar</v-btn>
            </v-flex>
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
    localOption: { required, maxLength: maxLength(30) },
    localValue: {required},
  },
  props: {
    option: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    index:{
        type: Number,
        required: true,
    }
  },
  data(){
      return{
          localOption : this.option,
          localValue: this.value,
      }
  },

  computed: {
    optionErrors() {
      const errors = [];
      if (!this.$v.localOption.$dirty) return errors;
      if (!this.$v.localOption.maxLength) errors.push('El texto de la opción debe de ser maximo de 30 caracteres.');
      if (!this.$v.localOption.required) errors.push('El texto de la opción es requerido.');
      return errors;
    },
    valueErrors(){
        const errors = [];
        if (!this.$v.localValue.$dirty) return errors;
        if (!this.$v.localValue.required) errors.push('El valor de la opción es requerido.');
        return errors;
    }
  },

  methods: {
    async submit() {
      this.$v.$touch();
      this.loading = true;
      this.response = {'option': this.option}; //CALL API
      this.clear();
      this.loading = false;
    },
    clear() {
        this.$v.$reset();
    },
    deleteClick(){
        this.$emit("deleteClick", this.index);
    }
  },
};
</script>