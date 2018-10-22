import Vue from 'vue';
import Router from 'vue-router';

import Auth from '@okta/okta-vue';
import sampleConfig from '@/.samples.config';

import HelloWorld from './components/HelloWorld.vue';
import LoginComponent from './components/Login.vue';
import ProfileComponent from './components/Profile.vue';

Vue.use(Router);
Vue.use(Auth, {
  issuer: sampleConfig.oidc.issuer,
  client_id: sampleConfig.oidc.clientId,
  redirect_uri: sampleConfig.oidc.redirectUri,
  scope: sampleConfig.oidc.scope,
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
