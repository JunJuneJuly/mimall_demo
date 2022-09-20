<template>
    <div class="order-pay">
        <order-header title="支付订单">
            <template v-slot:tip><span>请谨防钓鱼链接或诈骗电话，了解更多</span></template>
        </order-header>
        <div class="wrapper-content">
            <div class="content">
                <div class="container">
                    <div class="order-title">
                        <div class="icon-gou"><span></span></div>
                        <div class="order-tip">
                            <h5>订单提交成功！去付款咯~</h5>
                            <p>请在<span class="fc">0小时30分内</span>完成支付，超时后将取消订单</p>
                            <p>收获信息：
                                <span>{{ownerinfo.receiverName}}</span> <span>{{ownerinfo.receiverMobile}}</span><span>{{ownerinfo.receiverProvince}}</span><span>{{ownerinfo.receiverCity}}</span>
                                <span>{{ownerinfo.receiverDistrict}}</span><span>{{ownerinfo.receiverAddress}}</span>
                            </p>
                        </div>
                        <div class="order-price">
                            <p class="tprice">应付总额：<span class="fc">2599元</span></p>
                            <p class="icon">订单详情<span class="icon-down" @click="showDeatil = !showDeatil" :class="{'up':showDeatil}"></span></p>
                        </div>
                    </div>
                    <div class="order-content" v-show="showDeatil">
                        <div class="order-num"><span>订单号：</span><span class="fontS">{{orderNo}}</span></div>
                        <div class="order-info"><span>收获信息：</span><span>{{ownerinfo.receiverName}} {{ownerinfo.receiverMobile}}</span><span>{{ownerinfo.receiverProvince}}</span> <span>{{ownerinfo.receiverCity}}</span> <span>{{ownerinfo.receiverDistrict}}</span> <span>{{ownerinfo.receiverAddress}}</span>
                        </div>
                        <div class="order-name"><span>商品名称：</span>
                            <ul>
                                <li v-for="(item,i) in orderinfo" :key="i">{{item.productName +''+ item.quantity +''+ item.totalPrice}}</li>
                                <!--<li>小米8青春版 标准高透贴膜 高透</li>-->
                            </ul>
                        </div>
                        <div class="check-info"><span>发票信息：</span><span>电子发票 个人</span></div>
                    </div>
                </div>
            </div>
            <div class="order-way">
                <div class="container">
                    <div class="order-title">
                        <h4>选择以下支付方式付款</h4>
                    </div>
                    <div class="order-choose">
                        <h5>支付平台</h5>
                        <div class="order-icon">
                            <div class="alipay" @click="payway=1" :class="{'checked':payway == 1}">
                                <img src="../../public/imgs/pay/icon-ali.png" alt=""  @click="paySubmit(1)">
                            </div>
                            <div class="wechatpay" @click="payway=2" :class="{'checked':payway == 2}">
                                <img src="../../public/imgs/pay/icon-wechat.png" alt="" @click="paySubmit(2)"></div>
                        </div>
                    </div>
                </div>
            </div>
            <scan-pay-code @close="closePayModal" :img="payImg" v-if="showPay"></scan-pay-code>
            <modal
                    title="支付确认"
                    btnType="3"
                    :showModal="showPayModal"
                    sureText="查看订单"
                    cancelText="未支付"
                    @cancel="showPayModal=false"
                    @submit="goOrderList">
                <template v-slot:body>
                    <p>订单是否已经成功支付？</p>
                </template>
            </modal>
        </div>
    </div>

</template>
<script type="text/ecmascript-6">
    import QRCode from 'qrcode';
    import ScanPayCode from './../components/ScanPayCode';
    import Modal from './../components/Modal';
    import OrderHeader from './../components/OrderHeader';
    export default {
        name:'order-pay',
        components:{
            ScanPayCode,
            Modal,
            OrderHeader
        },
        data(){
            return{
                showPay:false,//微信支付弹窗
                showPayModal:false,//支付确认订单弹框
                payway:'',//支付方式
                totalPrice:'',//应付金额
                orderNo:'',//订单号
                ownerinfo:{},//收获人信息
                orderinfo:{},//商品信息
                showDeatil:false,//默认订单详情不显示
                payImg:'',//微信支付的二维码地址
                // loopOrderState:'',//
                T:''//定时器
            }
        },
        mounted(){
            this.getOrderList();
        },
        methods:{
            getOrderList(){
                let orderNo = this.$route.query.orderNo;
                this.axios.get(`/orders/${orderNo}`,{
                    params:{
                        orderNo:this.orderNo
                    }
                }).then((res)=>{
                    this.totalPrice = res.payment;//获取应付金额
                    this.orderNo = res.orderNo;//订单号
                    this.ownerinfo = res.shippingVo;//收货人信息
                    this.orderinfo = res.orderItemVoList;
                    console.log(res)
                })

            },
            paySubmit(payway){
                if (payway == 1){
                    window.open('/#/order/alipay?orderId='+this.orderNo,'_blank')
                }else {
                    this.axios.post('/pay',{
                        orderId:this.orderNo,
                        orderName:'Vue小米高仿商城',
                        amount:0.01,
                        payType:2
                    }).then((res)=>{
                        QRCode.toDataURL(res.content)
                            .then(url=>{
                                this.showPay = true;
                                this.payImg = url;
                                this.loopOrderState();
                            })
                            .catch(()=>{
                                this.$message.error('微信二维码生成失败')
                            })

                    })

                }
            },
            //关闭微信弹窗
            closePayModal(){
                this.showPay = false;
                this.showPayModal = true;
                clearInterval(this.T);
            },
            //轮询订单状态
            loopOrderState(){
                this.T = setInterval(()=>{
                    this.axios.get(`/orders/${this.orderNo}`).then((res)=>{
                        if (res.status == 20){
                            clearInterval(this.T);
                            this.goOrderList();
                        }
                    })
                },1000)
            },
            //返回订单页面
            goOrderList(){
                this.$router.push('/order/list');
            }
        }
    }
</script>
<style lang="scss" scoped>
    .wrapper-content{
        background: #D7D7D7;
        width: 100%;
        height: 100%;
        padding-top: 30px;
        padding-bottom: 100px;
        .content{
            /*margin-top: 30px;*/
            .container{
                background: white;
                .order-title{
                    width: 1121px;
                    margin-left: auto;
                    margin-right: auto;
                    padding: 40px 0 54px 0;
                    border-bottom: 1px solid #D7D7D7;
                    display: flex;
                    justify-content: space-between;
                    .icon-gou{
                        display: inline-block;
                        width: 30px;
                        margin-right: 30px;
                        span{
                            display: inline-block;
                            width: 60px;
                            height: 60px;
                            border-radius: 50%;
                            background: #05e577 url("../../public/imgs/icon-gou.png") no-repeat center;
                        }

                    }
                    .order-tip{
                        width: 950px;
                        display: inline-block;
                        margin-left: 30px;
                        h5{
                            font-size: 24px;
                            font-weight: 400;
                            color: #333333;
                            margin-bottom: 20px;
                        }
                        p{
                            font-size: 14px;
                            font-weight: 400;
                            color: #666666;
                            .fc{
                                color: #FF6600;
                                margin-right: 0px;
                            }
                            span{
                                margin-right: 5px;
                            }
                        }
                    }
                    .order-price{
                        display: inline-block;
                        width: 200px;
                        position: relative;
                        .tprice{
                            position: absolute;
                            right: 0;
                            font-size: 14px;
                            font-weight: 400;
                            color: #666666;
                            .fc{
                                color: #FF6600;
                                font-size: 28px;
                            }

                        }
                        .icon{
                            margin-top: 50px;
                            display: inline-block;
                            position: absolute;
                            right: 0;
                            .icon-down{
                                width: 14px;
                                height: 10px;
                                display: inline-block;
                                background: url("../../public/imgs/icon-down.png") no-repeat center;
                                background-size: contain;
                                margin-left: 9px;
                                cursor: pointer;
                                transition: all .5s;
                                &.up{
                                    transform: rotate(180deg);
                                }
                            }
                        }
                    }
                }
                .order-content{
                    /*transition: all .5s;*/
                    padding: 47px 0 53px 140px;
                    font-size: 14px;
                    font-weight: 300;
                    color: #333333;
                    div{
                        margin-bottom: 19px;
                    }
                    .fontS{
                        color: #FF6600;
                    }
                    .order-name{
                        position: relative;
                        span{
                            display: inline-block;
                            position: absolute;
                            top: 0;
                        }
                        ul{
                            display: inline-block;
                            margin-left: 70px;
                            li{
                                margin-bottom: 5px;
                                width: 100%;
                            }
                        }
                    }

                }
            }
        }
        .order-way{
            margin-top: 20px;
            .container{
                background: white;
                .order-title{
                    padding: 26px 0 24px 0;
                    width: 1119px;
                    margin-left: auto;
                    margin-right: auto;
                    border-bottom: 1px solid #d7d7d7;
                    h4{
                        font-size: 20px;
                        font-weight: 400;
                        color: #333333;
                    }
                }
                .order-choose{
                    width: 1119px;
                    margin-left: auto;
                    margin-right: auto;
                    h5{
                        padding: 26px 0 19px 0;
                        font-size: 18px;
                        font-weight: 400;
                        color: #333333;
                    }
                    .order-icon{
                        padding-bottom: 70px;
                        .alipay{
                            display: inline-block;
                            width: 180px;
                            height: 64px;
                            margin-right: 20px;
                            border: 1px solid #d7d7d7;
                            text-align: center;
                            line-height: 64px;
                            cursor: pointer;
                            img{
                                width: 103px;
                                vertical-align: middle;
                            }
                            &.checked{
                                border: 1px solid #FF6600;
                            }
                        }
                        .wechatpay{
                            line-height: 64px;
                            display: inline-block;
                            width: 180px;
                            height: 64px;
                            border: 1px solid #d7d7d7;
                            margin-right: 20px;
                            text-align: center;
                            cursor: pointer;
                            img{
                                width: 111px;
                                vertical-align: middle;
                            }
                            &.checked{
                                border: 1px solid #FF6600;
                            }
                        }
                    }

                }

            }
        }
    }
</style>
