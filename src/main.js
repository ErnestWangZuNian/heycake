import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routes from './router/router'
import ajax from './utils/ajax.js'
import { Toast } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(VueRouter)
Vue.use(VueResource)
ajax.getDataFromApi({
  url: '/v1/goods?recommend=true'
}, (data) => {
  console.log(data)
})
// 实例化router
const router = new VueRouter({
  routes
})
/* eslint-disable no-new */
new Vue({
  router,
  Toast
}).$mount('#app')

