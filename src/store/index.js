import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
Vue.use(Vuex)

//管理状态
const state = {
    username:'',
    cartcount:0
};
//导入变量
export default new Vuex.Store({
    state,
    mutations,
    actions
});