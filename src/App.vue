<template>
  <div id="app">
    <nav>
    <div class="nav-wrapper">

      <router-link
      to="/"
      class="brand-logo">
      Helsinki voting system
      </router-link>

      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li>
          <router-link
          to="/login"
          v-if="!authenticated">
          Login
          </router-link>
        </li>
        <li>
          <router-link
          to="/"
          v-if="authenticated"
          v-on:click.native="logout()">
          Logout
          </router-link>
        </li>
        <li>
          <router-link
          to="/profile"
          v-if="authenticated">
          Profile
          </router-link>
        </li>
        <li>
          <router-link
          to="/polls">
          Polls
          </router-link>
        </li>
        <li>
          <router-link
          to="/poll">
          Poll view Demo
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
    <router-view />
  </div>
</template>


<script>
/* eslint-disable */
export default {
  name: 'app',
  data () {
    return {
      activeUser: null,
      authenticated: false,
    }
  },
  async created () {
    await this.refreshActiveUser();
  },
  watch: {
    // everytime a route is changed refresh the activeUser
    '$route': 'refreshActiveUser'
  },
  methods: {
    async refreshActiveUser () {
      this.activeUser = await this.$auth.getUser();
      this.authenticated = await this.$auth.isAuthenticated();
    },
    async logout () {
      await this.$auth.logout();
      await this.refreshActiveUser();
    }
  }
}
</script>
