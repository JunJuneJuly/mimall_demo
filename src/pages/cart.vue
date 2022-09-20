<template>
    <div class="cart">
        <div class="title-container">
            <order-header title="我的购物车">
                <template v-slot:tip><span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span></template>
            </order-header>
        </div>
        <div class="cart-content">
            <div class="container">
                <div class="cart-table">
                    <ul class="table-title">
                        <li class="col-1"><a href="javascript:;" class="icon-choose" :class="{'checked':allChecked}" @click="toggleAll"></a>全选</li>
                        <li class="col-3">商品名称</li>
                        <li class="col-1">单价</li>
                        <li class="col-2">数量</li>
                        <li class="col-1">小计</li>
                        <li class="col-1">操作</li>
                    </ul>
                    <ul class="table-item" v-for="(item,i) in productlist" :key="i">
                        <li class="col-1"><a href="javascript:;" class="icon-choose" :class="{'checked':item.productSelected}" @click="toggle(item)"></a></li>
                        <li class="col-3 item-title"><img v-lazy="item.productMainImage" alt=""><span class="item-name">{{item.productName}} {{item.productSubtitle}}</span></li>
                        <li class="col-1">{{item.productPrice}}</li>
                        <li class="item-count col-2"><span class="icon-sub" @click="toggle(item,'-')">-</span><span>{{item.quantity}}</span><span class="icon-add" @click="toggle(item,'+')">+</span></li>
                        <li class="col-1">{{item.productPrice*item.quantity}}</li>
                        <li class="col-1"><span class="icon-del" @click="delPro(item)"></span></li>
                    </ul>

                </div>
                <div class="table-footer">
                    <div class="footerL"><a href="#" class="goshopping">继续购物</a><span>共{{productlist.length}}件商品，已选择{{this.checkedNum}}件</span></div>
                    <div class="footerR">合计：<span class="price">{{this.cartTotalPrice}}</span>元<a href="javascript:;" class="clear" @click="goOrder">去结算</a></div>
                </div>
            </div>
        </div>
        <service-bar></service-bar>
        <nav-footer></nav-footer>
    </div>
</template>
<script type="text/ecmascript-6">
    import OrderHeader from '../components/OrderHeader'
    import ServiceBar from '../components/ServiceBar'
    import NavFooter from '../components/NavFooter'
    export default {
        components:{
            OrderHeader,
            ServiceBar,
            NavFooter
        },
        data(){
            return{
                // checked: false,
                productlist:{},
                allChecked:false,
                cartTotalPrice:'',
                checkedNum:''
            }
        },
        mounted(){
            this.getCartInfo();
        },
        methods:{
            getCartInfo(){
                this.axios.get('/carts').then((res)=>{
                    this.renderData(res);
                    console.log(res)
                })
            },
            //全选
            toggleAll(){
                let url = this.allChecked ? '/carts/unSelectAll':'/carts/selectAll';
                this.axios.put(url).then((res)=>{
                    this.renderData(res);
                })
            },
            //删除
            delPro(item){
                this.axios.delete(`/carts/${item.productId}`,{
                }).then((res)=>{
                    this.renderData(res);
                    console.log(res);//cartTotalQuantity
                    this.$store.dispatch('saveCartCount',res.cartTotalQuantity);

                })
            },
            //+,-,选中复选框
            toggle(item,type){
                let quantity = item.quantity,
                    selected = item.productSelected;
                if(type == '-'){
                    if (quantity == 1){
                        this.$message.warning('商品数量不能低于1。');
                        return;
                    } 
                    --quantity;
                }else if(type == '+'){
                    if (quantity > item.productStock){
                        this.$message.warning('没有这么多商品');
                        return;
                    }
                    ++quantity;
                }else {
                    selected = !item.productSelected;
                }
                this.axios.put(`/carts/${item.productId}`,{
                    quantity,
                    selected
                }).then((res)=>{
                    this.renderData(res);
                })
            },
            //结算
            goOrder(){
              let isChecked = this.productlist.every(item=>!item.productSelected);
              if (isChecked){
                  this.$message.warning('至少选中一件商品');
                  return;
              }
              this.$router.push('/order/confirm');
            },
            //全局变量
            renderData(res){
                this.productlist = res.cartProductVoList || [];
                this.allChecked = res.selectedAll;
                this.cartTotalPrice = res.cartTotalPrice;
                this.checkedNum = this.productlist.filter(item=>item.productSelected).length;
            }
        }

    }
</script>
<style lang="scss" scoped>
    @import "../assets/scss/mixin";
    @import "../assets/scss/config";
    @import "../assets/scss/button";
    @import "../assets/scss/base";
    .cart{
        width: 100%;
        .cart-content{
            width: 100%;
            background: #F5F5F5;
            padding: 30px 0 130px 0;
            .container{
                /*padding: 28px 59px 29px 70px;*/
                /*background: white;*/
                .cart-table{
                    background: white;
                    padding-top: 32px;
                    width: 100%;
                    .table-title {
                        display: flex;
                        text-align: center;
                        width: 1140px;
                        margin-left: auto;
                        margin-right: auto;
                        padding-bottom: 33px;
                        border-bottom: 1px solid #E5E5E5;
                        li {
                            display: inline-block;
                            font-size: 14px;
                            font-weight: 400;
                            color: #666666;
                        }

                    }
                    .table-item{
                        text-align: center;
                        display: flex;
                        height: 125px;
                        align-items: center;
                        width: 1140px;
                        margin-left: auto;
                        margin-right: auto;
                        li {
                            display: inline-block;
                            font-size: 14px;
                            font-weight: 400;
                            color: #333333;
                            .icon-del{
                                @include bgImg(14px,12px,'/imgs/icon-close.png');
                                display: inline-block;
                                cursor: pointer;
                            }
                        }
                        .item-title{
                            height: 80px;
                            line-height: 80px;
                            display: inline-block;
                            img{
                                width: 80px;
                                display: inline-block;
                                vertical-align: middle;
                            }
                        }
                        .item-count{
                            width: 150px;
                            height: 40px;
                            border: 1px solid #cccccc;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                            span{
                                display: inline-block;
                                cursor: pointer;
                                font-size: 14px;
                            }

                        }
                    }
                }
                .table-footer{
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                    .footerL{
                        height: 50px;
                        font-size: 14px;
                        font-weight: 300;
                        color: #666666;
                        line-height: 50px;
                        .goshopping{
                            margin-right: 30px;
                            height: 50px;
                            font-size: 14px;
                            font-weight: 300;
                            color: #666666;
                            line-height: 50px;
                        }
                    }
                    .footerR{
                        font-size: 14px;
                        color: #FF6600;
                        .price{
                            font-size: 20px;
                        }
                        .clear{
                            display: inline-block;
                            width: 202px;
                            height: 50px;
                            text-align: center;
                            font-size: 18px;
                            font-weight: 300;
                            background: #FF6600;
                            color: #FFFFFF;
                            line-height: 50px;
                            margin-left: 30px;
                        }
                    }
                }
            }

        }
    }
</style>
