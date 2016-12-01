import Vue from 'vue'
Vue.filter('price', function (value) {
  // 返回处理后的价格
  value = '￥' + (value * 100 / 100).toFixed(2)
  return value
})
