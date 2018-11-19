import Vue from 'vue';
import Vuetify from 'vuetify';
import VueChartkick from 'vue-chartkick';
import 'vuetify/dist/vuetify.min.css';
import VueClipboard from 'vue-clipboard2';
import App from './App.vue';
import router from './router';


Vue.use(VueClipboard);
Vue.use(Vuetify);
Vue.use(VueChartkick);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
