import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isShowFrame:true,
  },
  mutations: {
    increment (state,isShow) {
      state.isShowFrame = isShow == false ? isShow : true;
    },
  },
})

export default store;
