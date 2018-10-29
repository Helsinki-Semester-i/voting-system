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
};
