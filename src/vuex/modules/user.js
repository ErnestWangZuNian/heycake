import * as types from '../mutation-types'

const state = {
  isLogin: false
}
const mutations = {
  [ types.GET_USER_INFO ] (state) {
    console.log(state)
  }
}
export default {
  state,
  mutations
}
