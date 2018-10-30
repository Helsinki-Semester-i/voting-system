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
  }
};

const VOTES_FOR_POLL_TEST = [
  {
    id: 1,
    question: 'Do you agree with rule 1?',
    open: true,
    answers: {
      1: 'Agree',
      2: 'Disagree',
      3: 'Neutral',
    },
  }
];

const POLLTEST = {
  id: 1,
  description: 'This is a test Poll',
  participants: [],
  anonymous: true,
  questions: VOTES_FOR_POLL_TEST,
};
