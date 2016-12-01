import * as types from '../mutation-types'

const state = {
  userInfo: {
    isLogin: false,
    userId: null
  }
}
const mutations = {
  [ types.SET_USER_INFO ] (state, userInfo) {
    state.userInfo.isLogin = userInfo.isLogin
  }
}
export default {
  state,
  mutations
}
