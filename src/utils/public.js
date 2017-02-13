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
        if (!hash[elem[value]]) {
          hash[elem[value]] = true
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
  // sessionstorage 存储数据
  sessionstorageData (key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  // 获取sessionstorage存储的数据
  sessionstorageGetData (key) {
    let val = JSON.parse(window.sessionStorage.getItem(key))
    return val
  },
  // localstorage 存储数据
  localstorageData (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  // 获取localstorage存储的数据
  localstorageGetData (key) {
    let val = JSON.parse(window.localStorage.getItem(key))
    return val
  },
  // 手机号码处理
  detailPhone (value) {
    let re = /^(\d{3})(\d{4})(\d{4})$/
    let arr = re.exec(value)
    let result = arr[1] + ' ' + arr[2] + ' ' + arr[3]
    return result
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
