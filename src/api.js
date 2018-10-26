/* eslint-disable */
import Vue from 'vue';
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8081/',
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
