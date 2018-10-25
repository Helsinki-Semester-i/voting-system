/* eslint-disable */
import Vue from 'vue';
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://voting-system-api.appspot.com/',
  json: true,
});

export default {
  getParts() {
    return this.execute('get', '/parts');
  },
};
