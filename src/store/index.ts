import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
  state: {
    info: {
      uname: 'Leo',
      age: 21,
    },
  },
  mutations: {
    updateUname(state, val) {
      state.info.uname = val
    },
    updateUage(state, val) {
      state.info.age = val
    },
  },
  actions: {
    asyncUpdate(store, val) {
      setTimeout(() => {
        store.commit('updateUage', val)
      }, 1000)
    },
  },
  getters: {
    format(state) {
      return state.info.uname + '， meet you'
    },
  },
  modules: {},
  // 配置插件
  plugins: [
    // 持久化
    createPersistedstate({
      key: 'saveInfo',
      // paths: ['info'],
    }),
  ],
})
