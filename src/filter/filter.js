import Vue from 'vue'
// 单个价格处理
Vue.filter('price', function (value) {
  // 返回处理后的价格
  value = '￥' + (value * 100 / 100).toFixed(2)
  return value
})
// 针对价格区间的处理
Vue.filter('priceRange', function (value) {
  // 返回处理后的价格区间
  let newValue = []
  value = value.split(',')
  newValue = value.map((val) => {
    val = '￥' + (val * 100 / 100).toFixed(2)
    return val
  })
  newValue = newValue.join('-')
  return newValue
})
