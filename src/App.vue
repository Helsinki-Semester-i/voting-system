<template>
  <v-app>
    <v-toolbar dark>
      <v-toolbar-title>Helsinki voting system try 3</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          to="/"
        >Home</v-btn>
        <v-btn
          flat
          to="/profile"
          v-if="authenticated"
        >Profile</v-btn>
        <v-btn
          flat
          to="/registerPanelist"
          v-if="isAdmin"
        >Register Panelist</v-btn>
        <v-btn
          flat
          to="/login"
          v-if="!authenticated"
        >Login</v-btn>
        <v-btn
          flat
          to="/login"
          v-if="authenticated"
          @click.native="logout()"
        >Logout</v-btn>
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
  created() {
    this.refreshActiveUser();
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
      return this.authenticated
      && this.activeUser != null
      && this.activeUser.groups.includes(userGroups.adminGroup);
    },
  },
};
</script>
