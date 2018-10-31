<template>
  <div class="row">
    <div v-if="side">
      <div class="col s1">
        <div class="waves-effect waves-light btn blue lighten-2" style="min-height: 100vh;  width: 7vw" @click="changeSide">
        </div>
      </div>
      <div class="col s11">
        <h1 class="center-align">Tus votaciones abiertas</h1>
        <div :key="poll.id" v-for="poll in completedPolls">
          <Poll_info :poll=poll :details=false />
        </div>
        <div :key="poll.id" v-for="poll in pendingPolls">
          <Poll_info :poll=poll :details=false />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="col s11">
        <h1 class="center-align">Historial</h1>
        <div :key="poll.id" v-for="poll in closedPolls">
          <Poll_info :poll=poll :details=false />
        </div>
      </div>
      <div class="col s1">
        <div class="waves-effect waves-light btn blue lighten-2" style="min-height: 100vh; width: 7vw" @click="changeSide">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Poll_info from './Poll_info.vue';

export default {
  components: {
    Poll_info,
  },
  data() {
    return {
      side: false,
      polls: [
        {
          id: 1,
          title: 'Definición de reglamento',
          description: 'En esta votación se definirá si se aceptan o no las nuevas reglas para formar parte de la asamblea de Wikipolítica. Entre ellas están: Haber participado por lo menos en 3 proyectos sociales \n Completar todo registro de nuevos asambleistas \n Proponer una idea nueva',
          closeDate: '10/29/2018',
          participation: true,
          active: false,
        },
        {
          id: 2,
          title: 'Definición de reglamento 2',
          description: 'En esta votación se definirá si se aceptan o no las nuevas reglas para formar parte de la asamblea de Wikipolítica. Entre ellas están: Haber participado por lo menos en 3 proyectos sociales \n Completar todo registro de nuevos asambleistas \n Proponer una idea nueva',
          closeDate: '11/01/2018',
          participation: true,
          active: true,
        },
        {
          id: 3,
          title: 'Selección de presidencia de Wikipolítica periodo 2019',
          description: 'Se decidirá quien será el nuevo presidente de la organización durante el siguiente año.',
          closeDate: '11/02/2018',
          participation: false,
          active: true,
        },
        {
          id: 4,
          title: 'Sanción para Juan Perez',
          description: 'El ex-tesorero de Wikipolítica, Juan Perez, fue sorprendido gastando dinero de la organización en objetos personales. En esta votación decidiremos que tipo de sanción darle.',
          closeDate: '10/30/2018',
          participation: false,
          active: false,
        },
        {
          id: 6,
          title: 'Reforma de regla para conferencias',
          description: 'Decidiremos que reglas añadir al reglamento para poder crear una conferencia y llevarla a cabo en orden',
          closeDate: '11/01/2018',
          participation: true,
          active: true,
        },
      ],
    };
  },
  computed: {
    completedPolls() {
      return this.polls.filter(poll => !poll.participation && poll.active);
    },
    pendingPolls() {
      return this.polls.filter(poll => poll.participation && poll.active);
    },
    closedPolls() {
      return this.polls.filter(poll => !poll.active);
    },
  },
  methods: {
    changeSide() {
      this.side = !this.side;
    },
  },
};
</script>
