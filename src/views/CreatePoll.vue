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
            <v-date-picker
              v-model="creation_date"
              @input="menu = false"
              no-title scrollable>
            </v-date-picker>
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
            <v-date-picker
              v-model="close_date"
              @input="menu2 = false"
              no-title scrollable>
            </v-date-picker>
          </v-menu>
          <v-layout row align-center justify-center>
            <h4 class="display-1">Premisas</h4>
          </v-layout>
          <!-- CREAR PREGUNTAS -->
          <v-container :key="question.id" v-for="(question, order) in questions">
            <v-container fluid grid-list-md>
              <v-layout row justify-space-between>
                <v-flex xs10>
                  <v-text-field
                    v-model="question.question"
                    :error-messages="questionErrors"
                    :counter="50"
                    label="Premisa"
                    required
                    @input="$v.question.$touch()"
                    @blur="$v.question.$touch()"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-btn column flat small @click="createOption(order)">Añadir</v-btn>
                  <v-btn flat small color="error" @click="deleteQuestion(order)">Borrar</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
            <!-- LISTAR OPCIONES -->
            <v-layout :key="option.id" v-for="(option, index) in question.options">
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
                    <v-btn flat small color="error"
                      @click="deleteOption(order, index)">
                      Borrar
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            <!-- FIN LISTAR OPCIONES -->
            </v-layout>
            <v-divider></v-divider>
          </v-container>
          <!-- FIN CREAR PREGUNTAS -->
          <v-btn block color="success" dark @click="createQuestion">Crear nueva premisa</v-btn>
          <v-layout row align-center justify-center>
            <h4 class="display-1">Participantes</h4>
          </v-layout>
          <v-layout :key="user.id" v-for="(user, index) in users">
            <v-container grid-list-sm>
              <v-layout row justify-space-between>
                <v-flex xs10>
                  <div>{{user}}</div>
                </v-flex>
                <v-flex xs2>
                  <v-btn flat small color="error" @click="deleteUser(index)">Borrar</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-layout>
          <v-container grid-list-sm>
            <v-layout row justify-space-between>
              <v-flex xs10>
                <v-text-field
                  v-model="addingUser"
                  :error-messages="addingUserErrors"
                  :counter="50"
                  label="email"
                  @input="$v.addingUser.$touch()"
                  @blur="$v.addingUser.$touch()"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-btn flat small color="success" @click="addUser(addingUser)">Agregar</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <v-subheader class="pl-0">Porcentaje de participación</v-subheader>
          <v-slider
          v-model="acceptance_percentage"
          always-dirty
          v-bind:hint="quorum"
          persistent-hint
          thumb-label="always"
          ></v-slider>
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
    question: { required, maxLength: maxLength(50) },
    acceptance_percentage: { required },
    addingUser: { email },
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
      questions: [
        {
          question: 'Escribe algo aqui',
          options: [
            {
              option: 'Muy en contra',
              value: 1,
            },
            {
              option: 'En contra',
              value: 2,
            },
            {
              option: 'Neutral',
              value: 3,
            },
            {
              option: 'A favor',
              value: 4,
            },
            {
              option: 'Muy a favor',
              value: 5,
            },
          ],
        },
      ],
      users: [
        'jose18carl@gmail.com',
        'andres@andres.com',
        'estefycp@hotmail.com',
        'gerajuarez@homail.com',
        'papatri@gmail.com',
      ],
      addingUser: '',
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
    questionErrors() {
      const errors = [];
      if (!this.$v.question.$dirty) return errors;
      if (!this.$v.question.maxLength) errors.push('La premisa debe de ser maximo de 50 caracteres.');
      if (!this.$v.question.required) errors.push('La premisa es requerida.');
      return errors;
    },
    addingUserErrors() {
      const errors = [];
      if (!this.$v.addingUser.$dirty) return errors;
      if (!this.$v.addingUser.email) errors.push('Debes de escribir un correo.');
      return errors;
    },
    quorum() {
      const quorum = this.users.length * (this.acceptance_percentage / 100);
      return `Quorum: ${Math.round(quorum)} de ${this.users.length} participantes.`;
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
      this.response = {
        title: this.title,
        details: this.details,
        creation_date: this.creation_date,
        close_date: this.close_date,
        users: this.users,
        acceptance_percentage: this.acceptance_percentage,
        anonymity: true,
      }; // CALL API
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
    createQuestion() {
      const newQuestion = {
        question: '',
        options: [
          {
            option: 'Muy en contra',
            value: 1,
          },
          {
            option: 'En contra',
            value: 2,
          },
          {
            option: 'Neutral',
            value: 3,
          },
          {
            option: 'A favor',
            value: 4,
          },
          {
            option: 'Muy a favor',
            value: 5,
          },
        ],
      };
      this.questions.push(newQuestion);
    },
    deleteQuestion(order) {
      this.$delete(this.questions, order);
    },
    createOption(order) {
      const newOption = { option: '', value: 0 };
      this.questions[order].options.push(newOption);
    },
    deleteOption(order, index) {
      this.$delete(this.questions[order].options, index);
    },
    async addUser(userMail) {
      const data = await api.userExistsByMail(userMail);
      if (data) {
        for (let i = 0; i < this.users.length; i += 1) {
          if (this.users[i] === userMail) {
            console.log('User is already in the list');
            return;
          }
        }
        this.users.push(userMail);
        this.addingUser = '';
      } else {
        console.log('User does not exists');
      }
    },
    deleteUser(index) {
      this.$delete(this.users, index);
    },
  },
};
</script>
