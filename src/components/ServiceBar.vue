<template>
  <div class="serviebar">
    <div class="container">
      <ul>
        <li><span class="icon-setting"></span>预约维修服务</li>
        <li><span class="icon-7day"></span>7天无理由退货</li>
        <li><span class="icon-15day"></span>15天免费换货</li>
        <li><span class="icon-post"></span>满150元包邮</li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      name:'service-bar'
    }
</script>
<style lang="scss">
  @import "../assets/scss/base";
  @import "../assets/scss/mixin";
  .serviebar{
    .container{
      display: flex;
      justify-content: space-between;
      align-items: center;
      ul{
        width: 100%;
        padding: 32px 0;
        li{
          display: inline-block;
          width: 24.8%;
          text-align: center;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #666666;
          border-right: 1px solid #E5E5E5;
          &:last-child{
            border-right:0;
          }
            .icon-setting{
              @include bgImg(20px,20px,'../../public/imgs/icon-setting.png');
              line-height: 20px;
              vertical-align: middle;
            }
            .icon-7day{
              @include bgImg(20px,20px,'../../public/imgs/icon-7day.png');
              vertical-align: middle;
            }
            .icon-15day{
              @include bgImg(20px,20px,'../../public/imgs/icon-15day.png');
              vertical-align: middle;
            }
            .icon-post{
              @include bgImg(20px,20px,'../../public/imgs/icon-post.png');
              vertical-align: middle;
            }
        }
      }

    }
  }
</style>
