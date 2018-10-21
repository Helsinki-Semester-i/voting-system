import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@okta/okta-vue';
import HelloWorld from './components/HelloWorld.vue';

Vue.use(Auth, {
  issuer: 'https://dev-749221.oktapreview.com/oauth2/default',
  client_id: '0oagngnmpqmKB0S6t0h7',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email',
});

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld,
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback(),
    },
  ],
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
