import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import routes from './router/router'
import store from './vuex/index'
import filters from './filter/filter'
import { Lazyload, InfiniteScroll, Indicator } from 'mint-ui'
import VueJsonp from 'vue-jsonp'
import 'mint-ui/lib/style.css'
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(Lazyload)
Vue.use(InfiniteScroll)
Vue.use(VueJsonp)
// 设置错误处理页面
Vue.http.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
Vue.http.options.emulateJSON = true
Vue.http.options.xhr = { withCredentials: true }
//  vue拦截器用于处理不同的错误
Vue.http.interceptors.push((request, next) => {
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  })
  next((response) => {
    if (!response.ok) {
      console.log('404页面')
      return response
    } else {
      Indicator.close()
    }
  })
})

// 处理刷新的时候vuex被清空但是用户已经登录的情况
let savedUserInfo = JSON.parse(window.localStorage.getItem('userInfo'))
if (savedUserInfo) {
  if (savedUserInfo.isLogin) {
    // console.log(savedUserInfo)
    store.dispatch('setUserInfo', savedUserInfo)
  }
}
// 实例化router
const router = new VueRouter({
  base: '/site/',
  routes
})
// 把路由和状态管理挂在根组件
new Vue({
  router,
  filters,
  store
}).$mount('#app')

