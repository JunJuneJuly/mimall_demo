/**
 *商城Vuex-mutations，导出一个object对象
 */
export default {
    saveUserName(state,username){
        state.username = username;
    },
    saveCartCount(state,cartcount){
        state.cartcount = cartcount;
    }

}