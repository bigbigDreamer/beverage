import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  state,//状态
  mutations,//定义状态修改
  actions,//提交mutations
  getters,//获取数据
})
