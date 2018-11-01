<template>
  <div class="container">
    <div class="row">
      <br>
      <br>
      <br>
      <br>
      <div class="col s9 center-align">
        <h1>Hello World</h1>
        <p>This is the homepage of your vue app</p>
      </div>
      <div class="col s3">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">{{demoTitleVote}}</span>
            <p>{{demoBodyVote}}</p>
          </div>
          <div class="card-action">
            <router-link
            to="/polls">
            {{demoLinkVote}}
            </router-link>
          </div>
        </div>
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">{{demoTitleResults}}</span>
            <p>{{demoBodyResults}}</p>
          </div>
          <div class="card-action">
            <router-link
            to="/result/1">
            {{demoLinkResults}}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
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
