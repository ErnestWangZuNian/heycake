import * as types from '../mutation-types'

const state = {
  isLogin: false
}
const mutations = {
  [ types.SET_USER_INFO ] (state, loginFlag) {
    state.isLogin = loginFlag
  }
}
export default {
  state,
  mutations
}
