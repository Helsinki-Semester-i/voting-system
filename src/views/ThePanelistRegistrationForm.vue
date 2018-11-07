<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2>
        <h3>Register a new Panelist</h3>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import authApi from '@/okta_api';

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
  },

  methods: {
    submit() {
      this.$v.$touch();
      authApi.postUser(this.fname, this.lname, this.email);
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
