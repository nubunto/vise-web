import Vue from 'vue'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import App from './App'

Vue.use(VueResource)
Vue.use(VueValidator)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
