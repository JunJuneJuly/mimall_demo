<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="../../public/imgs/logo-mi.png" alt="">
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <ul>
        <li><a href="#">河畔一角主页</a></li>
        <li><a href="#">Vue全栈课程</a></li>
        <li><a href="#">React全家桶课程</a></li>
        <li><a href="#">微信支付专项课程（H5+小程序+Node+Mongo）</a></li>
      </ul>
      <div class="Copyright">
        <p>Copyright ©2020<span>mi.futurefe.com</span> All Rights Reserved.</p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      name:'nav-footer'
    }
</script>
<style scoped lang="scss">
  .footer{
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    background: #333333;
    text-align: center;
    padding-bottom: 46px;
    border-top: 4px solid #FF6600;
    .footer-logo{
      img{
        width: 53px;
        margin-top: 36px;
      }
      p{
        font-size: 16px;
        font-family: FZLanTingHeiS-R-GB;
        font-weight: 400;
        color: #999999;
        margin-top: 13px;
      }
    }
    .footer-link{
      margin-top: 31px;
      li{
        display: inline;
        border-right: 2px solid #999999;
        margin-right: 10px;
        &:last-child{
          border-right: 0;
        }
        a{
          font-size: 16px;
          font-family: FZLanTingHeiS-R-GB;
          font-weight: 400;
          color: #999999;
          line-height: 28px;
          padding-right: 10px;
        }
      }
    }
    .Copyright{
      font-size: 16px;
      font-family: FZLanTingHeiS-R-GB;
      font-weight: 400;
      color: #999999;
      line-height: 28px;
      span{
        color: #FF6600;
      }
    }
  }
</style>
