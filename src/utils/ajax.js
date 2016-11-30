import Vue from 'vue'
// import urlRoot from './urlRoot.js'
const ajax = {
  xhrhttp (params, callback, error) {
    Vue.http({
      url: params.url,
      params: params.data ? params.data : {},
      body: params.body ? params.body : {},
      method: params.method
    }).then((response) => {
      callback && callback(response)
    }).catch((response) => {
      error && error(response)
    })
  },
  getDataFromApi (params, callback, error) {
    params.method = 'get'
    this.xhrhttp(params, callback, error)
  },
  postDataToApi (params, callback, error) {
    params.method = 'post'
    this.xhrhttp(params, callback, error)
  },
  putDataToApi (params, callback, error) {
    params.method = 'put'
    this.xhrhttp(params, callback, error)
  },
  deleteDataFromApi (params, callback, error) {
    params.method = 'delete'
    this.xhrhttp(params, callback, error)
  }
}
export default ajax
