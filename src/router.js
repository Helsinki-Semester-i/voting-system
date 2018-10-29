import Vue from 'vue';
import Router from 'vue-router';

import Auth from '@okta/okta-vue';

import HelloWorld from './components/HelloWorld.vue';
import LoginComponent from './components/Login.vue';
import ProfileComponent from './components/Profile.vue';

Vue.use(Router);
Vue.use(Auth, {
  issuer: process.env.VUE_APP_AUTH_ISSUER,
  client_id: process.env.VUE_APP_AUTH_CLIENT_ID,
  redirect_uri: process.env.VUE_APP_AUTH_REDIRECT_URI,
  scope: process.env.VUE_APP_AUTH_SCOPE,
});

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld,
    },
    {
      path: '/login',
      component: LoginComponent,
    },
    {
      path: '/profile',
      component: ProfileComponent,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback(),
    },
  ],
});

/* eslint-disable */ 
const onAuthRequired = async (from, to, next) => {
  if (from.matched.some(record => record.meta.requiresAuth) &&
  !(await Vue.prototype.$auth.isAuthenticated())) {
    // Navigate to custom login page
    next({ path: '/login' });
  } else {
    next();
  }
};

// router.beforeEach(Vue.prototype.$auth.authRedirectGuard());
router.beforeEach(onAuthRequired);

export default router;
