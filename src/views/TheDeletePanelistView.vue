<template>
  <v-container>
    <v-layout row align-center justify-center>
      <h3 class="display-2">Remove a panelist from the platform</h3>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <v-form>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-btn @click="trySubmit()">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
        <v-dialog v-model="confirmDialog" persistent max-width="290">
          <v-card>
            <v-card-title
              class="headline"
              primary-title=""
            >Estás por borrar a un usuario</v-card-title>
            <v-card-text>¿Estás seguro de tu decisión?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                flat
                @click="confirmDialog = false"
              >No acepto</v-btn>
              <v-btn color="green darken-1" flat
                @click="confirmDialog = false; submit()"
              >Acepto</v-btn>
              <v-dialog
                v-model="loadingDialog"
                hide-overlay
                persistent
                width="300"
              >
                <v-card color="primary" dark>
                  <v-card-text>
                    Por favor espere
                    <v-progress-linear
                      indeterminate
                      color="white"
                      class="mb-0"
                    ></v-progress-linear>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="endDialog" persistent max-width="290">
          <v-card>
            <v-card-text v-if="success">El usuario fue borrado</v-card-text>
            <v-card-text v-else>
              El usuario no existe o ya fue borrado.
              Intente de nuevo mas tarde o contacte al administrador.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="removeDialog()"
              >Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import api from '@/api';

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
  },

  data() {
    return {
      email: '',
      response: '',
      confirmDialog: false,
      loadingDialog: false,
      endDialog: false,
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      if (!this.$v.email.email) errors.push('Must be valid e-mail');
      if (!this.$v.email.required) errors.push('E-mail is required');
      return errors;
    },
    success() {
      return this.response !== 'ERROR_API_WIKI';
    },
  },
  methods: {
    trySubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.confirmDialog = true;
      }
    },
    async submit() {
      this.loadingDialog = true;
      this.response = await api.deleteUser(this.email);
      this.clear();
      this.loadingDialog = false;
      this.endDialog = true;
    },
    clear() {
      this.$v.$reset();
      this.email = '';
    },
    removeDialog() {
      this.response = '';
      this.endDialog = false;
    },
  },
};
</script>
