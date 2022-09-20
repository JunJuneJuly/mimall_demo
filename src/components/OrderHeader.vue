<template>
  <div class="orderheader">
    <div class="container">
      <div class="header-logo">
        <a href="#"></a>
      </div>
      <div class="order-title">
        <h2 class="mycart">{{title}}<slot name="tip"></slot></h2>
      </div>
      <div class="author">{{username}}</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex';
    export default {
      name:'order-header',
      props:{
          title:String
      },
      computed:{
          ...mapState(['username'])
      }

    }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/mixin";
  .orderheader{
    width: 100%;
    border-bottom: 2px solid #FF6600 ;
    .container{
      @include flex();
      .header-logo{
        display: inline-block;
        width: 55px;
        height: 55px;
        background-color: #FF6600;
        margin: 29px 0 31px 0;
        a{
          display: inline-block;
          width: 110px;
          height: 55px;
          &:before{
            content: ' ';
            @include bgImg(55px,55px,'/imgs/mi-logo.png');
          }
          &:after{
            content: ' ';
            @include bgImg(55px,55px,'/imgs/mi-home.png');
          }
          &:hover:before{
            margin-left: -55px;
            transition: margin-left .2s;
          }
        }
      }
      .order-title{
        width: 953px;
        .mycart{
          font-size: 28px;
          font-weight: 400;
          color: #333333;
          span{
            margin-left: 17px;
            font-size: 14px;
            font-weight: 300;
            color: #999999;
          }
        }


      }
      .author{
        font-size: 16px;
        font-weight: 400;
        color: #666666;
      }
    }
  }
</style>
