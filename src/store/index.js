import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    PopupPageType: 0,//弹出消息类型,如果为0则不弹出
  },
  mutations: {
    openPopupPage(state, val) {
      state.PopupPageType = val;
    }
  },
  actions: {
  },
  modules: {
  }
})
