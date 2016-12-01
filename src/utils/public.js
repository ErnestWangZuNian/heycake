var utils = {
  imgDetail: function (val) {
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
  }
}
export default utils
