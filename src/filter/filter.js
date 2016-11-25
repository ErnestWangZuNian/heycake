import Vue from 'vue'
Vue.filter('imgDetail', function (value) {
  // 返回处理后的值
  let str = '/attachment${value}/'
  return str
})
