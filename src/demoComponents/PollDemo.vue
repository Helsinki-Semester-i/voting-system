<template>
  <v-container wrap align-center>
    <v-layout align-center>
      <v-flex xs6 offset-xs2>
        <v-form>
          <h3 class="font-weight-bold display-2">{{poll.title}}</h3>
           <br >
          <div v-for="(question,index) in questions" :key="question.id">
            <closed-question :question="question" :disabled="false"
              :index="index" @changeAnswer="changeAnswer" />
             <br/>
          </div>
          <v-dialog v-model="dialog" persistent max-width="290">
            <v-btn slot="activator" color="flat dark" dark>Submit</v-btn>
            <v-card>
              <v-card-title class="headline" primary-title="">
                Estas seguro de tu desicion?
              </v-card-title>
              <v-card-text>Ya no podras cambiar tu voto</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="green darken-1" flat @click.native="dialog = false">No acepto</v-btn>
                <v-btn color="green darken-1" flat
                @click.native="dialog = false; loadingDialog = true">
                  Acepto
                </v-btn>
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
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import api from '@/api';
import ClosedQuestion from '../components/ClosedQuestion.vue';

export default {
  components: {
    ClosedQuestion,
  },
  data() {
    return {
      poll: {},
      questions: [],
      dialog: false,
      loadingDialog: false,
      activeUser: null,
    };
  },
  async created() {
    await this.getPollData();
  },
  methods: {
    async getPollData() {
      const { id } = this.$route.params;
      this.poll = await api.getPollDemo(id);
      this.questions = this.poll.questions;
      /* eslint-disable */
      for (const i in this.questions) {
        this.questions[i].response = null;
      }
    },
    changeAnswer(index, value) {
      this.questions[index].response = value;
    },
  },
  watch: {
    loadingDialog(val) {
      if (!val) return;
      setTimeout(async () => {
        this.loadingDialog = false;
        const data = await api.submitVoteDemo(this.poll);
        console.log(`Vote submited with code ${data.unique_code}`);
        this.$router.push({ name: 'uniqueCode' ,
        params: { code: data.unique_code } } );
      }, 4000);
    },
  },
};
</script>
