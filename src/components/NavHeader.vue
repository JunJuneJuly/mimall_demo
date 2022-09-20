<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">松果出行</a>
          <a href="javascript:;">MIUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-if="username" @click="loginout">退出</a>
          <a href="/#/order/list" v-if="username" @click="tocart">我的订单</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" class="my-cart" @click="tocart"><span class="icon-cart"></span>购物车{{cartcount}}</a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product"  v-for="(item,index) of phoneList" :key="index">
                  <a :href="'/#/product/'+item.id" target="_blank">
                    <img :src="item.mainImage" :alt="item.subtitle">
                    <div class="product_title">{{ item.name }}</div>
                    <div class="product_price">¥{{item.price}}元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>Redmin红米</span>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <img src="../../public/imgs/nav-img/nav-3-1.jpg" alt="">
                    <div class="product_title">小米壁画电视 65英寸</div>
                    <div class="product_price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <img src="../../public/imgs/nav-img/nav-3-2.jpg" alt="">
                    <div class="product_title">小米全面屏电视E55A</div>
                    <div class="product_price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <img src="../../public/imgs/nav-img/nav-3-3.png" alt="">
                    <div class="product_title">小米电视4A 32英寸</div>
                    <div class="product_price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <img src="../../public/imgs/nav-img/nav-3-4.jpg" alt="">
                    <div class="product_title">小米电视4A 55英寸</div>
                    <div class="product_price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <img src="../../public/imgs/nav-img/nav-3-5.jpg" alt="">
                    <div class="product_title">小米电视4A 65英寸</div>
                    <div class="product_price">2699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <img src="../../public/imgs/nav-img/nav-3-6.png" alt="">
                    <div class="product_title">查看全部</div>
                    <div class="product_price">查看全部</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text">
            <a href="#"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
    export default {
      name:'nav-header',
      data(){
          return{
              phoneList:[],
              // username:this.$store.state.username,//读取store状态数据
          }
      },
      computed:{ //实时计算然后获取用户信息和购物车数量
          // username(){
          //     return this.$store.state.username//读取store状态数据
          // },
          // cartcount(){
          //     return this.$store.state.cartcount//读取store状态数据
          // }
          ...mapState(['username','cartcount'])
      },
      mounted(){
          this.getProductList();
          let params = this.$route.params;
          if (params && params.from == 'login'){
              this.getCartCount();
          }


      },
      methods:{
          //跳转到登录页面
          login(){
              this.$router.push('/login');
          },
          //鼠标移到小米出现的列表
          getProductList(){
              this.axios.get('/products',
                  {params:{
                      categoryId:'100012',
                      pageSize:'6'
                      }
                  }).then((res)=>{
                      this.phoneList = res.list;
                      // console.log(res.list);
              })
          },
          //跳转到购物车
          tocart(){
              this.$router.push('/cart');
          },
          //下线
          loginout(){
              this.axios.post('/user/logout').then(()=>{
                  this.$message.success('账号已成功下线！')
                  this.$cookie.set('userId','',{expires:'-1'});
                  this.$store.dispatch('saveUserName','');
                  this.$store.dispatch('saveCartCount','0');
              })
          },
          //获取账号的购物车列表
          getCartCount(){
              this.axios.get('/carts/products/sum').then((res=0)=>{
                  // console.log(res);
                  this.$store.dispatch('saveCartCount',res);
              })
          }
      }
    }
</script>
<style lang="scss" scoped>
  @import "../../src/assets/scss/base";
  @import "../../src/assets/scss/mixin";
  @import "../../src/assets/scss/config";
  .header{
    .nav-topbar{
      background-color: #333333;
      .container{
        @include flex();
        .topbar-menu{
          display: inline-block;
          a{
            margin-right: 17px;
            height: 39px;
            line-height: 39px;
            color: #B0B0B0;
            font-size: 12px;
            cursor: pointer;
          }
        }
        .topbar-user{
          display: inline-block;
          a{
            margin-right: 17px;
            height: 39px;
            line-height: 39px;
            color: #B0B0B0;
            font-size: 12px;
            cursor: pointer;
          }
          .my-cart{
            display: inline-block;
            text-align: center;
            background-color: #FF6600;
            cursor: pointer;
            width: 110px;
            height: 39px;
            color: white;
            .icon-cart{
              @include bgImg(12px,16px,"../../public/imgs/icon-cart-checked.png");
              margin-right: 4px;
            }
          }
        }
      }
    }
    .nav-header{
      .container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 112px;
        position: relative;
        @include flex();
        .header-logo{
          display: inline-block;
          width: 55px;
          height: 55px;
          background-color: #FF6600;
          a{
            display: inline-block;
            width: 110px;
            height: 55px;
            &:before{
              display: inline-block;
              width: 55px;
              height: 55px;
              content: '';
              background: url("../../public/imgs/mi-logo.png") no-repeat;
              background-size: contain;
              transition: margin-left .2s;
            }
            &:after{
              display: inline-block;
              width: 55px;
              height: 55px;
              content: '';
              background: url("../../public/imgs/mi-home.png") no-repeat;
              background-size: contain;
            }
            &:hover:before{
              margin-left: -55px;
              transition: margin-left .2s;
            }
          }
        }
        .header-menu{
          width: 646px;
          padding-left: 210px;
          .item-menu{
            display: inline-block;
            color: #333333;
            span{
              display: inline-block;
              font-size: 16px;
              font-weight: 400;
              line-height: 112px;
              margin-right: 30px;
              cursor: pointer;
            }
            &:hover{
              color: $colorA;
              .children{
                height: 220px;
                opacity: 1;
                z-index: 15;
              }
            }
            .children{
              width: 1226px;
              background: #ffffff;
              opacity: 0;
              height: 0px;
              overflow: hidden;
              box-sizing: border-box;
              left: 0px;
              position: absolute;
              box-shadow: 0px 7px 6px 0px rgba(0,0,0,0.11);
              border-top: 1px solid #e5e5e5;
              transition: all .5s;
              .product{
                width: 16.66%;
                text-align: center;
                display: inline-block;
                position: relative;
                img{
                  height: 92px;
                  margin-top: 26px;
                }
                .product_title{
                  color: #333333;
                  font-size: 12px;
                }
                .product_price {
                  color: $colorA;
                }
                &:after{
                  content: ' ';
                  left: 100%;
                  top: 25px;
                  height: 99px;
                  border-left: 1px solid #D7D7D7;
                  position: absolute;
                }
                &:last-child:after{
                  display: none;
                }
              }
            }
          }
        }
        .header-search{
          .wrapper{
            height: 50px;
            width: 319px;
            border: 1px solid #999999;
            display: flex;
            align-items: center;
            input{
              width: 264px;
              border: none;
              border-right:1px solid #999999;
              line-height: 50px;
              padding-left: 14px;
            }
            a{
              @include bgImg(18px,18px,"../../public/imgs/icon-search.png");
              margin-left: 12px;
            }
          }
        }
      }
    }
  }
</style>
