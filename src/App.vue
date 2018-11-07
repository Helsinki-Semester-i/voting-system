<template>
  <v-app>
    <v-toolbar dark>
      <v-toolbar-title>
        <router-link to="/">
          Helsinki voting system
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <router-link
        to="/profile"
        v-if="authenticated">
          <v-btn flat>Profile</v-btn>
        </router-link>
        <router-link
        to="/registerPanelist"
        v-if="isAdmin">
          <v-btn flat>Register Panelist</v-btn>
        </router-link>
        <router-link
        to="/login"
        v-if="!authenticated">
          <v-btn flat>Login</v-btn>
        </router-link>
        <router-link
        to="/login"
        v-if="authenticated"
        @click.native="logout()">
          <v-btn flat>Logout</v-btn>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>
    <router-view />
  </v-app>
</template>


<script>
import userGroups from './utils/constants';

export default {
  name: 'app',
  data() {
    return {
      activeUser: null,
      authenticated: false,
    };
  },
  async created() {
    await this.refreshActiveUser();
  },
  watch: {
    // everytime a route is changed refresh the activeUser
    $route: 'refreshActiveUser',
  },
  methods: {
    async refreshActiveUser() {
      this.activeUser = await this.$auth.getUser();
      this.authenticated = await this.$auth.isAuthenticated();
    },
    async logout() {
      await this.$auth.logout();
      await this.refreshActiveUser();
    },
  },
  computed: {
    isAdmin() {
      return this.authenticated &&
      this.activeUser != null &&
      this.activeUser.groups.includes(userGroups.adminGroup);
    },
  },
};
</script>
