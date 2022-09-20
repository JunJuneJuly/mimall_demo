/**
 *商城Vuex-actions，导出一个object对象
 */
export default {
    //定义方法
    saveUserName(context,username){
        context.commit('saveUserName',username);
    },
    saveCartCount(context,cartcount){
        context.commit('saveCartCount',cartcount);
    }

}