<template>
  <v-container grid-list-lg >
    <v-layout >
      <v-flex d-flex  >
       <v-carousel hide-delimiters height=515>
        <v-carousel-item
          v-for="(item) in images"
          :key="item.id"
          :src="item.ImageUrl"
          >
        </v-carousel-item>
       </v-carousel>
      </v-flex>
      <v-flex xs3>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card color=#33B2AB class="white--text">
              <v-card-title primary-title>
                <div class="headline">{{demoTitleVote}}</div>
              </v-card-title>
              <v-card-text>
                <div>{{demoBodyVote}}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn  to="/pollsDemo"> {{demoLinkVote}}</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-card color=#33B2AB class="white--text">
              <v-card-title primary-title>
                <div class="headline">{{demoTitleResults}}</div>
                <div>{{demoBodyResults}}</div>
              </v-card-title>
              <v-card-actions>
                  <v-btn  to="/result/1"> {{demoLinkResults}}</v-btn>
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
      images: [{
        ImageUrl: 'http://wikipolitica.mx/wp-content/uploads/2017/04/14517450_1944055979161091_3312439522179145193_n.jpg',
        id: '1',
      }, {
        ImageUrl: 'http://olgapalacios.mx/media/images/backgrounds/02.jpg',
        id: '2',
      }, {
        ImageUrl: 'https://www.debate.com.mx/__export/1525550571865/sites/debate/img/2018/05/05/dubytkfvmaapne1.jpg_423682103.jpg',
        id: '3',
      }],
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
