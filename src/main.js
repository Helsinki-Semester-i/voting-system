import Vue from 'vue';
import VueChartkick from 'vue-chartkick';
import App from './App.vue';
import router from './router';

Vue.use(VueChartkick);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
