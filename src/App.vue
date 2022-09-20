<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  //import axios from 'axios'
export default {
    name: 'App',
    data() {
        return {
            // res:{}
        }
    },

    mounted() {
        if(this.$cookie.get('userId')){
            this.getUser();
            this.getCartCount();
        }

        // 第一种mock方法
        // this.axios.get('/mock/user/login.json').then((res)=>{
        //     this.res = res;
        // });

        //本地集成mockjs实现数据Mock
        // this.axios.get('/user/login').then((res)=>{
        //     this.res = res;
        // });
    },
    methods:{
        getUser(){
            this.axios.get('/user').then((res={})=>{
                this.$store.dispatch('saveUserName',res.username);
            })
        },
        getCartCount(){
            this.axios.get('/carts/products/sum').then((res=0)=>{
                // console.log(res);
                this.$store.dispatch('saveCartCount',res);
            })
        }
    }
}
</script>

<style lang="scss">
  @import 'assets/scss/reset.scss';
  @import "assets/scss/mixin";
  @import 'assets/scss/modal.scss';
  @import 'assets/scss/config';
  @import "assets/scss/button";
</style>
