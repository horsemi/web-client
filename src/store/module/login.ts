import { LoginState } from '@/types/views/login.interface'
import { GetterTree, MutationTree, ActionTree } from 'vuex'
import * as LoginApi from '@/api/login'
import * as MUTATION_TYPES from '@/store/mutation-types'

const state: LoginState = {
  // author: undefined
  loginUser: '',
  loginName: ''  
}

// 强制使用getter获取state
const getters: GetterTree<LoginState, any> = {
  // author1: (state: LoginState) => {
  //   console.info(state);
  //   return state.author;
  // }
  getloginUser: (state: LoginState) => {
    return state;
  }
}

// 更改state
const mutations: MutationTree<LoginState> = {
  // 更新state都用该方法
  [MUTATION_TYPES.PUBLIC.UPDATE_STATE](state: LoginState, data: LoginState) {
    for (const key in data) {
      if (!data.hasOwnProperty(key)) { return }
      state[key] = data[key]
    }
  }
}

const actions: ActionTree<LoginState, any> = {
  [MUTATION_TYPES.PUBLIC.UPDATE_STATE_ASYN]({ commit, state: LoginState }, data: LoginState) {
    commit(MUTATION_TYPES.PUBLIC.UPDATE_STATE, data)
  },
  [MUTATION_TYPES.PUBLIC.GET_DATA_ASYN]({ commit, state: LoginState }) {
    LoginApi.getData().then((res: any) => {
      commit(MUTATION_TYPES.PUBLIC.UPDATE_STATE)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

