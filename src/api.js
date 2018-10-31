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
  test_getSinglePoll() {
    return POLLTEST;
  },
  test_getUserPolls() {
    return USERPOLL;
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

const POLLTEST = {
  id: 3,
  title: 'Poll 1',
  description: 'This is a test Poll',
  participants: [],
  anonymous: true,
  questions: VOTES_FOR_POLL_TEST,
};

const USERPOLL = [
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
];
