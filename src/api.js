/* eslint-disable */
import Vue from 'vue';
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  json: true,
});

export default {
  async execute (method, resource, data) {

    return client({
      method,
      url: resource,
      data,
      headers: {
        
      },
    }).then(req => {
      return req.data
    })
  },
  getParts() {
    return this.execute('get', '/parts');
  },
};
