import Vue from 'vue'
// import urlRoot from './urlroot.js'
import { MessageBox } from 'mint-ui'
const ajax = {
  xhrhttp (params, callback, error) {
    Vue.http({
      url: params.url,
      params: params.data ? params.data : {},
      body: params.body ? params.body : {},
      method: params.method
    }).then((response) => {
      callback && callback(response)
    }).catch((err) => {
      if (err.data.code && err.data.code === '200003') {
        MessageBox({
          title: '提示',
          message: '您当前选择的地址推荐门店的库存不足'
        })
      }
      error && error(error)
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
