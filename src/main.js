var $ = window.jQuery = require('jquery');
require('materialize-css/dist/css/materialize.css')
require('materialize-css/dist/js/materialize.js')
window.axios = require('axios')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
