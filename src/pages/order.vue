<template>
  <div>
    <!--<order-header :title="title">-->
      <!--<template v-slot:tip><span>{{tip}}</span></template>-->
    <!--</order-header>-->
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script type="text/ecmascript-6">
   import ServiceBar from './../components/ServiceBar'
  import NavFooter from './../components/NavFooter'
    export default {
      name:'order',
        data(){
          return{
              title:"",
              tip:""
          }
        },
      components:{
        ServiceBar,
        NavFooter
      },
      mounted(){
          // let path = this.$route.path;
          // if (path == '/order/confirm'){
          //     this.title = "订单确认";
          //     this.tip = "请确认信息"
          // }else if(path == '/order/list'){
          //     this.title = "订单列表";
          //     this.tip = "请谨防钓鱼链接或诈骗电话，了解更多"
          // }else if(path == '/order/pay'){
          //     this.title = "支付订单";
          //     this.tip = "请谨防钓鱼链接或诈骗电话，了解更多"
          // }else{
          //     this.title = "支付宝支付";
          //     this.tip = "请谨防钓鱼链接或诈骗电话，了解更多"
          // }
      }
    }
</script>
<style scoped>

</style>
