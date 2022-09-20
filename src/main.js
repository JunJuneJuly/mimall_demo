import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import {Message,Icon} from 'element-ui'
import VueCookie from 'vue-cookie'
import 'swiper/css/swiper.css'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';

//import env from './env'

// const mock = false;
// if (mock){
//     require('./mock/api');
// }

//根据前端的跨域方式做调整
axios.defaults.baseURL = '/api';//基础值
axios.defaults.timeout = 8000;
//根据环境变量获取不同的请求地址
//axios.defaults.baseURL = env.baseURL;
Vue.use(Icon);
Vue.prototype.$message = Message;

// 接口错误拦截
axios.interceptors.response.use(function (response) {
    let res = response.data;//response.data接口的值
    let path = window.location.hash;//window.location.hash
    //console.log(res);
    if (res.status == 0) {
        return res.data;
    } else if (res.status == 10) {
        if(path != '#/index'){
            window.location.href = '/#/login';
        }
        return Promise.reject(res)
        // window.location.href = '/#/login';
    } else {
        // this.$message.warning(res.msg);
        Message({
            message:res.msg,
            type:'warning'
        });
        return Promise.reject(res);
    }
},(error)=> {
    // let res = error.response;
    Message({
        message:error.response.data.message,
        type:'error'
    });
    return Promise.reject(error)
});
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
// Vue.use(Message);
Vue.use(VueCookie);
Vue.use(VueLazyLoad,{
    loading:'/imgs/loading-svg/loading-balls.svg'
});


new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
