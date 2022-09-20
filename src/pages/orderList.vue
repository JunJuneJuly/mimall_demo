<template>
    <div class="order-list">
        <order-header title="订单列表">
            <template v-slot:tip><span>请谨防钓鱼链接或诈骗电话，了解更多</span></template>
        </order-header>
        <div class="wrapper">
            <div class="content">
                <loading v-if="loading"></loading>
                <div class="container" v-for="(item,index) in orderList" :key="index">
                    <div class="order-title">
                        <div class="title-content">
                            <p>{{item.createTime}}<span>|</span>
                                {{item.receiverName}}<span>|</span>
                                订单号：{{item.orderNo}}<span>|</span>
                                {{item.paymentTypeDesc}}
                            </p>
                        </div>
                        <div class="title-price">应付金额：<span>{{item.payment}}</span>元</div>
                    </div>
                    <div class="order-content" v-for="(i,j) in item.orderItemVoList" :key="j">
                        <div class="img"><img v-lazy="i.productImage" alt=""></div>
                        <div class="order-detail">
                            <p>{{i.productName}}</p>
                            <p>{{i.currentUnitPrice}}元 X {{i.quantity}}</p>
                        </div>
                        <div class="order-status" v-if="item.status == 10">
                            <a href="javascript:;" @click="goToPay(item.orderNo)">{{item.statusDesc}}</a>
                        </div>
                        <div class="order-status" v-else>
                            <a href="javascript:;">{{item.statusDesc}}</a>
                        </div>
                    </div>
                </div>
                <div class="container-ele">
                    <el-pagination
                        v-if="true"
                        background
                        :pageSize="pageSize"
                        layout="prev, pager, next"
                        :total="total"
                        @current-change="handleChange">
                    </el-pagination>
                    <el-button type="primary" :loading="loading" @click="loadMore" v-show="false">Loading</el-button>
                </div>
                <!--<div class="scroll"-->
                     <!--v-infinite-scroll="scrollMore"-->
                     <!--infinite-scroll-disabled="true"-->
                     <!--infinite-scroll-distance="410"-->
                     <!--&gt;-->
                    <!--<img src="../../public/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">-->
                <!--</div>-->
                <no-data v-if="!loading && orderList.length == 0"></no-data>

            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import OrderHeader from './../components/OrderHeader';
    import Loading from './../components/Loading';
    import NoData from './../components/NoData';
    import {Pagination,Button} from 'element-ui';
    import infiniteScroll from 'vue-infinite-scroll';
    export default {
        name:'order-list',
        data(){
          return{
              orderList:[],
              pageSize:2,
              total:0,
              pageNum:1,
              loading:false,
              busy:false,//默认会触发滚动
              showButton:true,//加载更多：是否显示按钮
              // product:[]
          }
        },
        directives: {
            infiniteScroll
        },
        components:{
            OrderHeader,
            Loading,
            NoData,
            [Pagination.name]:Pagination,
            [Button.name]:Button
        },
        mounted(){
            this.orderListDetail();

        },
        methods:{
            orderListDetail(){
                this.loading = true;
                this.busy = true;//不加载第二页
                this.axios.get('/orders',{
                    params:{
                        pageSize:2,
                        pageNum:this.pageNum
                    }
                }).then((res)=>{
                    this.busy = false;//请求回来即可滚动加载
                    this.orderList = this.orderList.concat(res.list);
                    this.total = res.total;
                    this.showButton = res.hasNextPage;
                    // console.log(res.list)
                    this.loading = false;//加载
                }).catch(()=>{
                    this.loading = false;
                })
            },
            goToPay(orderNo){
                this.$router.push({
                    path:'/order/pay',
                    query:{
                        orderNo
                    }
                });
            },
            //第一种分页器
            handleChange(pageNum){
                this.pageNum = pageNum;
                this.orderListDetail();
            },
            //第二种加载更多
            loadMore(){
                this.pageNum++;
                this.orderListDetail();
            },
            //第三种滚动加载
            // scrollMore(){
            //     this.busy = true;
            //
            //     setTimeout(()=>{
            //         this.pageNum++;
            //         this.getList();
            //     },500);
            // },
            //专门为滚动加载的使用
            // getList(){
            //     this.loading = true;//滚动标志
            //     this.axios.get('/orders',{
            //         params:{
            //             pageSize:10,
            //             pageNum:this.pageNum
            //         }
            //     }).then((res)=>{
            //         this.orderList = this.orderList.concat(res.list);
            //         this.loading = false;
            //         // console.log(res.hasNextPage);
            //         if(res.hasNextPage){
            //             this.busy = false;
            //             // console.log(this.busy)
            //         }else {
            //             this.busy = true;
            //             this.loading = false;
            //             // console.log(this.busy)
            //         }
            //     });
            // }
        },
    }
</script>
<style lang="scss" scoped>
    @import "./../assets/scss/mixin";
    .order-list{
        .wrapper{
            .content{
                background: #d7d7d7;
                padding-top: 33px;
                padding-bottom: 110px;
                width: 100%;
                height: 100%;
                .container{
                    background: white;
                    margin-right: auto;
                    margin-left: auto;
                    width: 1226px;
                    margin-bottom: 30px;
                    .order-title{
                        height: 74px;
                        line-height: 74px;
                        font-size: 16px;
                        font-weight: 300;
                        color: #666666;
                        padding-left: 43px;
                        background: #FFFAF7;
                        position: relative;
                        .title-content{
                            display: inline-block;
                            span{
                                margin-right: 9px;
                                margin-left: 9px;
                            }
                        }
                        .title-price{
                            display: inline-block;
                            position: absolute;
                            right: 45px;
                            line-height: 74px;
                            span{
                                font-size: 26px;
                                font-weight: 300;
                                color: #333333;
                            }
                        }

                    }
                    .order-content{
                        height: 145px;
                        position: relative;
                        padding-left: 43px;
                        vertical-align: middle;
                        .img{
                            display: inline-block;
                            img{
                                display: inline-block;
                                /*width: 69px;*/
                                height: 89px;
                                padding: 24px 0px 32px 43px;
                                vertical-align: middle;
                            }
                        }
                        .order-detail{
                            font-size: 20px;
                            font-weight: 400;
                            color: #333333;
                            padding-left: 45px;
                            display: inline-block;
                            vertical-align: middle;
                            p{
                                margin-bottom: 15px;
                                &:last-child{
                                    margin-bottom: 0;
                                }
                            }
                        }
                        .order-status{
                            display: inline-block;
                            position: absolute;
                            right: 43px;
                            font-size: 20px;
                            font-weight: 400;
                            top: 62px;
                            /****.icon{
                                @include bgImg(11px,15px,'/imgs/icon-down.png');
                                color: #FF6600;
                                transform: rotate(-90deg);
                                margin-left: 9px;
                            }*****/
                            a{
                                color: #FF6600;
                            }
                        }
                    }
                }
                .container-ele{
                    margin-right: auto;
                    margin-left: auto;
                    width: 1226px;
                    .el-pagination{
                        text-align: right;

                    }

                }
                .scroll{
                    text-align: center;
                }
            }

        }
    }

</style>
<style lang="scss">
    .container-ele{
        text-align: center;
        .el-pagination.is-background .el-pager li:not(.disabled).active{
            background-color: #FF6600;
            color: white;
        }
    }

</style>
