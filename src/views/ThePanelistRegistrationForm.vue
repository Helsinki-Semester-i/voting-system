<template>
  <v-container grid-list-lg>
    <v-layout row align-center justify-center>
      <h3 class="display-2">Register a new Panelist</h3>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <v-form>
          <v-text-field
            v-model="fname"
            :error-messages="fnameErrors"
            :counter="15"
            label="First Name"
            required
            @input="$v.fname.$touch()"
            @blur="$v.fname.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="lname"
            :error-messages="lnameErrors"
            :counter="15"
            label="Last Name"
            required
            @input="$v.lname.$touch()"
            @blur="$v.lname.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>

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
        <v-dialog
          v-model="dialog"
          width="500"
          >
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              Operacion realizada
            </v-card-title>
            <v-card-text v-if="success">
              Nuevo usuario creado <br>
              First name: {{response.data.profile.firstName}} <br>
              Last name: {{response.data.profile.lastName}} <br>
              Email: {{response.data.profile.email}}
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
    fname: { required, maxLength: maxLength(15) },
    lname: { required, maxLength: maxLength(15) },
    email: { required, email },
  },

  data() {
    return {
      fname: '',
      lname: '',
      email: '',
      response: '',
      loading: false,
    };
  },

  computed: {
    fnameErrors() {
      const errors = [];
      if (!this.$v.fname.$dirty) return errors;
      if (!this.$v.fname.maxLength) errors.push('First name must be at most 15 characters long');
      if (!this.$v.fname.required) errors.push('First name is required.');
      return errors;
    },
    lnameErrors() {
      const errors = [];
      if (!this.$v.lname.$dirty) return errors;
      if (!this.$v.lname.maxLength) errors.push('Last name must be at most 15 characters long');
      if (!this.$v.lname.required) errors.push('Last name is required.');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      if (!this.$v.email.email) errors.push('Must be valid e-mail');
      if (!this.$v.email.required) errors.push('E-mail is required');
      return errors;
    },
    dialog() {
      return this.response !== '';
    },
    success() {
      return this.response.data;
    },
  },

  methods: {
    async submit() {
      this.$v.$touch();
      this.loading = true;
      this.response = await api.postUser(this.fname, this.lname, this.email);
      this.clear();
      this.loading = false;
    },
    clear() {
      this.$v.$reset();
      this.fname = '';
      this.lname = '';
      this.email = '';
    },
  },
};
</script>