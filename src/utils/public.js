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
  },
  // 判断对象是否为空
  isEmptyObject (obj) {
    for (var key in obj) {
      return false
    }
    return true
  },
  // 删除数组的某一项
  arrayDelete (arr, val) {
    let arrIndex = -1
    arr.forEach((val, index) => {
      if (arr[index] === val) {
        arrIndex = index
      }
    })
    if (arrIndex !== -1) {
      arr = arr.splice(arrIndex, 1)
    }
    return arr
  }
}
export default utils
