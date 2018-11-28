/* eslint-disable */
import Vue from 'vue';
import axios from 'axios';
import constants from './utils/strings';

const client = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  json: true,
});

export default {
  async execute (method, resource, data, params) {
    let accessToken = await Vue.prototype.$auth.getAccessToken();
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params,
    }).then(response => {
      return response;
    }).catch(err => {
      return err;
    });
  },
  async postUser(fname, lname, email, phone) {
    let groupId = process.env.VUE_APP_PANELIST_ID;
    const newOktaUser = {
      profile: {
        firstName: fname,
        lastName: lname,
        email,
        login: email,
      },
      groupIds: [
        groupId,
      ],
    };
    const wikiUser = {
      first_name: fname,
      last_name: lname,
      email,
      phone,
    };
    let oktaResponse = await this.execute('post', '/oauth', newOktaUser, { activate: true });
    let wikiApiResponse = await this.execute('post', '/users', wikiUser);
    try {
      let { profile } = oktaResponse.data;
      let { phone } = wikiApiResponse; // Try to throw error if 'phone' atribute does not exists
      return profile;
    } catch(err) {
      return constants.API_ERROR;
    }
  },
  async deleteUser(email) {
    let oktaResponse = await this.execute('get', `/oauth/${email}`);
    let wikiUserData = await this.execute('get', `/users/${email}`);
    try {
      let { id } = oktaResponse.data;
      let wikiId = wikiUserData.id;
      await this.execute('delete', `/oauth/${id}`);
      await this.execute('delete', `/users/${wikiId}`);
      return id;
    } catch (err) {
      return constants.API_ERROR;
    }
  },
  test_getSinglePoll(id) {
    return USERPOLLS[id-1];
  },
  test_getUserPolls() {
    return USERPOLLS;
  },
  test_getPollResults(id) {
    return RESULT_TEST[0];
  },
  test_getVote(unique_code){
    return VOTECODETEST;
  },
  async createPoll(poll){
    return this.execute('post', '/polls', poll);
  },
  async getUserByMail(email){
    let response = await this.execute('get', 'users/byMail/'+email);
    console.log(response);
    try{
      console.log(response.data);
      return response.data;
    }catch(err){
      return constants.API_ERROR;
    }
  },
  async userExistsByMail(email){
    let response = await this.execute('get', 'users/byMail/'+email);
    console.log(response);
    try{
      console.log(response.data);
      let check = response.data.id;
      return true;
    }catch(err){
      return false;
    }
  },
  async getPoll(id){
    let response = await this.execute('get', 'polls/'+id);
    try{
      response.data.id;
      return response.data;
    }catch(err){
      return constants.API_ERROR;
    }
  },
  async submitVote(poll){
    let response = await this.execute('post', 'votes/', poll);
    try{
      return response.data;
    }catch(err){
      return constants.API_ERROR;
    }
  },
  async getUserPolls(id){
    let response = await this.execute('get', 'users/'+id);
    try{
      return response.data.polls;
    }catch(err){
      return constants.API_ERROR;
    }
  },
  async getUsersMails(){
    let response = await this.execute('get', 'users/');
    try{
      let usersMails = [];
      for(let i in response.data){
        usersMails.push(response.data[i].email);
      }
      return usersMails;
    }catch(err){
      return constants.API_ERROR;
    }
  },
  async getPollResults(id){
    let response = await this.execute('get', 'results/' + id);
    try{
      response.data.id;
      return response.data;
    }catch(err){
      return constants.API_ERROR;
    }
  },
  async getVoteByCode(code){
    let response = await this.execute('get', 'votes/'+code);
    try{
      if(response.data){
        return response.data;
      }
      return constants.API_ERROR;
    }catch(err){
      return constants.API_ERROR;
    }
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
  id: 1,
  title: 'Poll 1',
  description: 'This is a test Poll',
  participants: [],
  anonymous: true,
  questions: VOTES_FOR_POLL_TEST,
};

const VOTECODETEST = {
  id: 1,
  unique_code: 8358,
  date: '1/11/18',
  poll: POLLTEST,
  voter_id: null,
  votes: [
    {
      question: {
        id: 1,
        question: 'Do you agree with rule 1?',
        open: false,
        answers: {
          1: 'Agree',
          2: 'Disagree',
          3: 'Neutral',
        },
      },
      answer_id: '1',
    },
    {
      question: {
        id: 2,
        question: 'Do you agree with rule 2?',
        open: false,
        answers: {
          1: 'Agree',
          2: 'Disagree',
          3: 'Neutral',
        },
      },
      answer_id: '2',
    },

  ],
};
const RESULT_TEST = [
  {
    id: 123,
    title: 'Poll 1',
    description: 'This is a test Poll',
    participants: [],
    anonymous: true,
    questions: [
      {
        id: 1,
        question: 'Do you agree with rule 1?',
        open: false,
        answers: [
          {
            text: 'Agree',
            votes: 100
          },
          {
            text: 'Disagree',
            votes: 10
          },
          {
            text: 'Neutral',
            votes: 95
          },
        ],
      },
      {
        id: 2,
        question: 'Do you agree with rule 2?',
        open: false,
        answers: [
          {
            text: 'Agree',
            votes: 1003
          },
          {
            text: 'Disagree',
            votes: 3023
          },
          {
            text: 'Neutral',
            votes: 1235
          },
        ],
      }
    ]
  }
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
