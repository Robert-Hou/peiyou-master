import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import cookie from "./plugins/cookie"

Vue.config.productionTip = false
new Vue({
  router,
  store,
  cookie,
  render: h => h(App)
}).$mount('#app')
