import Vue from 'vue'
// 单个价格处理
Vue.filter('price', (value) => {
  // 返回处理后的价格
  if (value !== undefined) {
    value = '￥' + (value * 100 / 100).toFixed(2)
    return value
  }
})
// 针对价格区间的处理
Vue.filter('priceRange', (value) => {
  // 返回处理后的价格区间
  let newValue = []
  if (value !== undefined) {
    value = value.split(',')
    newValue = value.map((val) => {
      val = '￥' + (val * 100 / 100).toFixed(2)
      return val
    })
    newValue = newValue.join('-')
    return newValue
  }
})
