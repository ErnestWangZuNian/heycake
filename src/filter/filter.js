import Vue from 'vue'
// 单个价格处理
Vue.filter('price', (value) => {
  // 返回处理后的价格
  if (value !== undefined) {
    value = '￥' + (value * 100 / 100).toFixed(2)
    return value
  }
})
// 价格除以100
Vue.filter('detailPrice', (value) => {
  if (value !== undefined) {
    value = '￥' + (value / 100).toFixed(2)
    return value
  }
})
// 保留两位小数
Vue.filter('stock', (value) => {
  if (value !== undefined) {
    value = Math.floor(value)
    return value
  }
})
// 针对价格区间的处理
Vue.filter('priceRange', (value) => {
  // 返回处理后的价格区间
  let newValue = []
  if (value !== undefined) {
    if (value.toString().indexOf(',') !== -1) {
      value = value.split(',')
      newValue = value.map((val) => {
        val = '￥' + (val * 100 / 100).toFixed(2)
        return val
      })
      newValue = newValue.join(' - ')
      return newValue
    } else {
      value = '￥' + (value * 100 / 100).toFixed(2)
      return value
    }
  }
})
// 针对规格数组显示进行处理
Vue.filter('spec', (value) => {
  if (value !== undefined) {
    let val = value.join('-')
    return val
  }
})
