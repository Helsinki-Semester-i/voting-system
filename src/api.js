import Vue from 'vue';
import axios from 'axios';
// import VueAxios from 'vue-axios';
// https://developer.okta.com/blog/2018/02/15/build-crud-app-vuejs-node

const client = axios.create({
  baseURL: 'http://localhost:8081/',
  json: true,
});

export default {
  async execute(method, resource, data) {
    // inject the accessToken for each request
    const accessToken = await Vue.prototype.$auth.getAccessToken();
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((req) => {
      return req.data;
    });
  },
  getPosts() {
    return this.execute('get', '/posts');
  },
  getPost(id) {
    return this.execute('get', `/posts/${id}`);
  },
  createPost(data) {
    return this.execute('post', '/posts', data);
  },
  updatePost(id, data) {
    return this.execute('put', `/posts/${id}`, data);
  },
  deletePost(id) {
    return this.execute('delete', `/posts/${id}`);
  },
};
