var utils = {
  imgDetail: function (val) {
    if (val instanceof Object) {
      if (val.picture) {
        val.picture = `/attachment/${val.picture}`
      }
    } else {
      val = `/attachment/${val}`
    }
    return val
  }
}
export default utils
