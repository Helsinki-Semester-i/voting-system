<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list dense>
         <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Inicio</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile to="/results">
          <v-list-tile-action>
            <v-icon>history</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Historial Pasado</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/registerPanelist" v-if="isAdmin">
          <v-list-tile-action>
            <v-icon>create</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Registrar Panelista</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/deletePanelist" v-if="isAdmin">
          <v-list-tile-action>
            <v-icon>delete</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Remover Panelista</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/createPoll" v-if="isAdmin">
          <v-list-tile-action>
            <v-icon>note_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Crear Votacion</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/polls" v-if="authenticated && !isAdmin">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mis votaciones</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/history" v-if="authenticated && !isAdmin">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Historial</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/vote" v-if="authenticated && !isAdmin">
          <v-list-tile-action>
            <v-icon>find_in_page</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Ver voto</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile to="/login" v-if="!authenticated">
          <v-list-tile-action>
            <v-icon>send</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/login" v-if="authenticated" @click="logout()">
          <v-list-tile-action>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Sistema de votaciones de Wikipolitica</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          to="/"
        >Home</v-btn>
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
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>


<script>
import userGroups from './utils/constants';

export default {
  name: 'app',
  data() {
    return {
      drawer: null,
      activeUser: null,
      authenticated: false,
      session: null,
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
