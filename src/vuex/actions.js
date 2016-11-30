import * as types from './mutation-types'
export const setUserInfo = ({commit}, loginFlag) => {
  commit(types.SET_USER_INFO, loginFlag)
}
