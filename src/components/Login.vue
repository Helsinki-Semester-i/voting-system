<template>
  <div class="login">
    <div id="okta-signin-container"></div>
  </div>
</template>

<script>
/* eslint-disable */

import OktaSignIn from '@okta/okta-signin-widget'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'
import '@okta/okta-signin-widget/dist/css/okta-theme.css'

export default {
  mounted: function () {
    this.$nextTick(function () {
      this.widget = new OktaSignIn({
        /**
         * Note: when using the Sign-In Widget for an OIDC flow, it still
         * needs to be configured with the base URL for your Okta Org. Here
         * we derive it from the given issuer for convenience.
         */
        baseUrl: process.env.VUE_APP_AUTH_BASE_URL,
        clientId: process.env.VUE_APP_AUTH_CLIENT_ID,
        redirectUri: process.env.VUE_APP_AUTH_REDIRECT_URI,
        logo: require('@/assets/logo.png'),
        i18n: {
          en: {
            'primaryauth.title': 'Sign in to Vue & Company'
          }
        },
        authParams: {
          responseType: ['id_token', 'token'],
          issuer: process.env.VUE_APP_AUTH_ISSUER,
          display: 'page',
          scopes: process.env.VUE_APP_AUTH_SCOPE.split(' '),
        }
      })

      this.widget.renderEl(
        { el: '#okta-signin-container' },
        () => {
          /**
           * In this flow, the success handler will not be called because we redirect
           * to the Okta org for the authentication workflow.
           */
        },
        (err) => {
          throw err
        }
      )
    })
  },
  destroyed () {
    // Remove the widget from the DOM on path change
    this.widget.remove()
  }
}
</script>