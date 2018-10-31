/* eslint-disable */
import Vue from 'vue';
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  json: true,
});

export default {
  async execute (method, resource, data) {
    let accessToken = await Vue.prototype.$auth.getAccessToken();
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    }).then(req => {
      return req.data
    })
  },
  getParts() {
    return this.execute('get', '/parts');
  },
  test_getSinglePoll(id) {
    return USERPOLLS[id-1];
  },
  test_getUserPolls() {
    return USERPOLLS;
  }
};

const VOTES_FOR_POLL_TEST = [
  {
    id: 1,
    question: 'Do you agree with rule 1?',
    open: false,
    answers: {
      1: 'Agree',
      2: 'Disagree',
      3: 'Neutral',
    },
  },
  {
    id: 2,
    question: 'Do you agree with rule 2?',
    open: false,
    answers: {
      1: 'Agree',
      2: 'Disagree',
      3: 'Neutral',
    },
  },
];

const USERPOLLS = [
  {
    id: 1,
    title: 'Definición de reglamento',
    description: 'En esta votación se definirá si se aceptan o no las nuevas reglas para formar parte de la asamblea de Wikipolítica. Entre ellas están: Haber participado por lo menos en 3 proyectos sociales \n Completar todo registro de nuevos asambleistas \n Proponer una idea nueva',
    closeDate: '10/29/2018',
    participants: [],
    participation: true,
    active: false,
    anonymous: true,
    questions: [],
  },
  {
    id: 2,
    title: 'Definición de reglamento 2',
    description: 'En esta votación se definirá si se aceptan o no las nuevas reglas para formar parte de la asamblea de Wikipolítica. Entre ellas están: Haber participado por lo menos en 3 proyectos sociales \n Completar todo registro de nuevos asambleistas \n Proponer una idea nueva',
    closeDate: '11/01/2018',
    participants: [],
    participation: true,
    active: true,
    anonymous: true,
    questions: [],
  },
  {
    id: 3,
    title: 'Selección de presidencia de Wikipolítica periodo 2019',
    description: 'Se decidirá quien será el nuevo presidente de la organización durante el siguiente año.',
    closeDate: '11/02/2018',
    participants: [],
    participation: false,
    active: true,
    anonymous: true,
    questions: VOTES_FOR_POLL_TEST,
  },
  {
    id: 4,
    title: 'Sanción para Juan Perez',
    description: 'El ex-tesorero de Wikipolítica, Juan Perez, fue sorprendido gastando dinero de la organización en objetos personales. En esta votación decidiremos que tipo de sanción darle.',
    closeDate: '10/30/2018',
    participants: [],
    participation: false,
    active: false,
    anonymous: true,
    questions: [],
  },
  {
    id: 6,
    title: 'Reforma de regla para conferencias',
    description: 'Decidiremos que reglas añadir al reglamento para poder crear una conferencia y llevarla a cabo en orden',
    closeDate: '11/01/2018',
    participants: [],
    participation: true,
    active: true,
    anonymous: true,
    questions: [],
  },
];
