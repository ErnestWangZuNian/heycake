import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import { Toast } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(VueRouter)

// 实例化router
const router = new VueRouter({
  routes
})
/* eslint-disable no-new */
new Vue({
  router,
  Toast
}).$mount('#app')

