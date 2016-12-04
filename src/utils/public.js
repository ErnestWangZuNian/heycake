var utils = {
  //  图片处理
  imgDetail (val) {
    if (val instanceof Object) {
      if (val.picture) {
        val.picture = `/attachment/${val.picture}`
      }
    } else if (val instanceof Array) {
      val.forEach((value) => {
        value = `/attachment/${value}`
      })
    } else {
      val = `/attachment/${val}`
    }
    return val
  },
  // 数组去重
  unique (arr, value) {
    let tempArr = []
    let hash = {}
    if (value === undefined) {
      arr.forEach((elem) => {
        if (!hash[elem]) {
          hash[elem] = true
          tempArr.push(elem)
        }
      })
    } else {
      arr.forEach((elem) => {
        if (!hash[elem.value]) {
          hash[elem.value] = true
          tempArr.push(elem)
        }
      })
    }
    return tempArr
  }
}
export default utils
