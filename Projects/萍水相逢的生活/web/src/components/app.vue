<template>
  <f7-app :params="f7params" >
    <!-- Your main view, should have "view-main" class -->
    <f7-view main class="safe-areas" url="/" 
      :push-state="true" push-state-separator="#!"></f7-view>
  </f7-app>
</template>
<script>
import routes from '../js/routes.js'

export default {
  data() {
    return {
      // Framework7 Parameters
      f7params: {
        name: 'F7', // App name
        theme: 'ios', // Automatic theme detection
        // App routes
        routes: routes
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    isWebView() {
      return this.$store.state.isWebView
    }
  }
}
</script>
