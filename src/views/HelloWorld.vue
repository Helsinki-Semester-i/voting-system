<template>
  <v-container
    grid-list-lg
  >
    <v-layout row wrap>
      <v-flex xs9>        
        <v-card>
          <v-card-title primary-title>
            <div class="headline">Hello World</div>
          </v-card-title>
          <v-card-text>
            <div>This is the homepage of your vue app</div>
          </v-card-text>
        </v-card>          
      </v-flex>
      <v-flex xs3>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div class="headline">{{demoTitleVote}}</div>
              </v-card-title>
              <v-card-text>
                <div>{{demoBodyVote}}</div>
              </v-card-text>
              <v-card-actions>          
                <router-link
                  to="/polls">
                  <v-btn flat dark>{{demoLinkVote}}</v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div class="headline">{{demoTitleResults}}</div>
                <div>{{demoBodyResults}}</div>
              </v-card-title>
              <v-card-actions>          
                <router-link
                  to="/result/1">
                  <v-btn flat dark>{{demoLinkResults}}</v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>       
    </v-layout>
  </v-container>
</template>

<script>
import HomeData from '../utils/strings';

export default {
  data() {
    return {
      demoTitleVote: HomeData.HOME_PAGE.demoTitleVote,
      demoBodyVote: HomeData.HOME_PAGE.demoBodyVote,
      demoLinkVote: HomeData.HOME_PAGE.demoLinkVote,
      demoTitleResults: HomeData.HOME_PAGE.demoTitleResults,
      demoBodyResults: HomeData.HOME_PAGE.demoBodyResults,
      demoLinkResults: HomeData.HOME_PAGE.demoLinkResults,
    };
  },
};
</script>
