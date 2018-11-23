<template>
  <v-container grid-list-lg>
    <v-layout row align-center justify-center>
      <h3 class="display-2">Crea una nueva votación</h3>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <v-form>
          <v-text-field
            v-model="title"
            :error-messages="titleErrors"
            :counter="30"
            label="Titulo"
            required
            @input="$v.title.$touch()"
            @blur="$v.title.$touch()"
          ></v-text-field>
          <v-textarea
            v-model="details"
            :error-messages="detailsErrors"
            label="Descripción"
            hint="Escriba la descripción"
            required
            @input="$v.details.$touch()"
            @blur="$v.details.$touch()"
          ></v-textarea>
          <v-menu
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"      
          >
            <v-text-field
            slot="activator"
            v-model="creation_date"
            label="Fecha de inicio"
            prepend-icon="event"
            readonly
            ></v-text-field>
            <v-date-picker v-model="creation_date" @input="menu = false" no-title scrollable></v-date-picker>
          </v-menu>
          <v-menu
            :close-on-content-click="false"
            v-model="menu2"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"   
          >
            <v-text-field
            slot="activator"
            v-model="close_date"
            label="Fecha final"
            prepend-icon="event"
            readonly
            ></v-text-field>
            <v-date-picker v-model="close_date" @input="menu2 = false" no-title scrollable></v-date-picker>
          </v-menu>
          <v-btn @click="submit">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
        <v-progress-circular
            v-show="loading"
            :size="70"
            :width="7"
            color="purple"
            indeterminate
        ></v-progress-circular>
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              Operacion realizada
            </v-card-title>
            <v-card-text v-if="success">
              Nueva votación creada <br>
              Título: {{response.title}} <br>
              Fecha de inicio: {{response.creation_date}} <br>
              Fecha de cierre: {{response.close_date}} <br>
            </v-card-text>
            <v-card-text v-else>
              Error, contacta al administrador
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="response = ''"
              >
                Ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>


  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import api from '@/api';

export default {
  mixins: [validationMixin],

  validations: {
    title: { required, maxLength: maxLength(30) },
    details: { required, maxLength: maxLength(200) },
    creation_date: { required },
    close_date: { required },
    //acceptance_percentage: {required},
  },

  data() {
    return {
        menu: false,
        modal: false,
        menu2: false,
        title: '',
        details: '',
        creation_date: '',
        close_date: '',
        acceptance_percentage: 50,
        response: '',
        loading: false,
    };
  },

  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      if (!this.$v.title.maxLength) errors.push('El título debe de ser maximo de 30 caracteres.');
      if (!this.$v.title.required) errors.push('El título es requerido.');
      return errors;
    },
    detailsErrors() {
      const errors = [];
      if (!this.$v.details.$dirty) return errors;
      if (!this.$v.details.maxLength) errors.push('La descripción debe de ser maximo de 200 caracteres.');
      if (!this.$v.details.required) errors.push('La descripción es requerida.');
      return errors;
    },
    creation_dateErrors() {
      const errors = [];
      if (!this.$v.creation_date.$dirty) return errors;
      if (!this.$v.creation_date.required) errors.push('La fecha inicial es requerida.');
      return errors;
    },
    close_dateErrors() {
      const errors = [];
      if (!this.$v.close_date.$dirty) return errors;
      if (!this.$v.close_date.required) errors.push('La fecha final es requerida.');
      return errors;
    },
    dialog() {
      return this.response !== '';
    },
    success() {
        return this.response;
      //return this.response.data;
    },
  },

  methods: {
    async submit() {
      this.$v.$touch();
      this.loading = true;
      this.response = {'title': this.title, 'details': this.details, 'creation_date': this.creation_date, 'close_date': this.close_date}; //CALL API
      this.clear();
      this.loading = false;
    },
    clear() {
        this.$v.$reset();
        this.title = '';
        this.details = '';
        this.creation_date = '';
        this.close_date = '';
        this.acceptance_percentage = 50;
    },
  },
};
</script>