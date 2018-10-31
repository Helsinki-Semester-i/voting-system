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
  test_getPollResults(id) {
    return RESULT_TEST[0];
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
