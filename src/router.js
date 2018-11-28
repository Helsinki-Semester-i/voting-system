import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@okta/okta-vue';

import userGroups from './utils/constants';

import httpForbidden403 from './views/errorViews/Http403.vue';
import HelloWorld from './views/HelloWorld.vue';
import LoginComponent from './views/Login.vue';
import ProfileComponent from './views/Profile.vue';
import PollsViewComponent from './views/PollsDashboard.vue';
import PollComponent from './views/Poll.vue';
import ViewVoteComponent from './views/ViewVote.vue';
import ResultComponent from './views/Result.vue';
import EnterCodeComponent from './views/EnterCode.vue';
import ShowCodeComponent from './demo_components/submitVote.vue';
import AddPanelistComponent from './views/ThePanelistRegistrationForm.vue';
import RemovePanelistComponent from './views/TheDeletePanelistView.vue';
import CreatePollComponent from './views/CreatePoll.vue';

import api from './api';

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
      path: '/polls',
      component: PollsViewComponent,
      meta: {
        requiresAuth: true,
        panelistAuth: true,
      },
    },
    {
      path: '/polls/:id',
      component: PollComponent,
      meta: {
        requiresAuth: true,
        panelistAuth: true,
      },
    },
    {
      path: '/result/:id',
      component: ResultComponent,
    },
    {
      path: '/vote',
      component: EnterCodeComponent,
      meta: {
        requiresAuth: true,
        panelistAuth: true,
      },
    },
    {
      path: '/vote/:unique_code',
      component: ViewVoteComponent,
    },
    {
      path: '/displaycode',
      component: ShowCodeComponent,
      props: true,
      name: 'uniqueCode',
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback(),
    },
    {
      path: '/registerPanelist',
      component: AddPanelistComponent,
      meta: {
        requiresAuth: true,
        adminAuth: true,
      },
    },
    {
      path: '/deletePanelist',
      component: RemovePanelistComponent,
      meta: {
        requiresAuth: true,
        adminAuth: true,
      },
    },
    {
      path: '/createPoll',
      component: CreatePollComponent,
      meta: {
        requiresAuth: true,
        adminAuth: true,
      },
    },
    {
      path: '/accessDenied',
      component: httpForbidden403,
    },
  ],
});

/* eslint-disable */ 
const onAuthRequired = async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) &&
  !(await Vue.prototype.$auth.isAuthenticated())) {
    // Navigate to custom login page
    next({ path: '/login' });
  } 
  else if (to.meta.adminAuth) {
    const authUser = await Vue.prototype.$auth.getUser();
    if (authUser.groups.includes(userGroups.adminGroup)) {
      next();
    } else {
      next({ path: '/accessDenied' });
    }
  }else if (to.meta.panelistAuth){
    const authUser = await Vue.prototype.$auth.getUser();
    const isUserInDB = await api.userExistsByMail(authUser.email);
    if (authUser.groups.includes(userGroups.panelistGroup) 
    &&  isUserInDB) {
      next();
    } else {
      next({ path: '/accessDenied' });
    }
  }
  else {
    next();
  }
};

// router.beforeEach(Vue.prototype.$auth.authRedirectGuard());
router.beforeEach(onAuthRequired);

export default router;