<template>
    <div class="o-confirm">
        <order-header title="订单确认">
            <template v-slot:tip><span>请确认信息</span></template>
        </order-header>
        <div class="order-confirm">
            <div class="container">
                <div class="addr">
                    <h4>收获地址</h4>
                    <div class="addr-information">
                        <div class="addr-info" v-for="(item,j) in addrList" :key="j" :class="{'checked':checkIndex == j}" @click="checkIndex=j">
                            <span class="addr-name">{{item.receiverName}}</span>
                            <span class="addr-tel">{{item.receiverMobile}}</span>
                            <span class="addr-detail">{{item.receiverProvince}} {{item.receiverCity}} {{item.receiverDistrict}}</span>
                            <div class="icon"><span class="icon-del"><i class="el-icon-delete" @click="delAddress(item)"></i></span><span class="icon-edi"><i class="el-icon-edit" @click="editAddress(item)"></i></span></div>
                        </div>
                        <div class="addr-add">
                            <div class="add-operation">
                                <p><span class="add-icon" @click="addAddress"></span></p>
                                <p>添加收货地址</p>
                            </div>
                        </div>
                    </div>
                    <div class="product">
                        <p class="product-title">商品</p>
                        <ul v-for="(item,i) in productList" :key="i">
                            <li class="col-3"><img v-lazy="item.productMainImage" alt="">{{item.productName}} {{item.productSubtitle}}</li>
                            <li class="col-2">{{item.productPrice}}x{{item.quantity}}</li>
                            <li class="col-1 tprice">{{item.productTotalPrice}}元</li>
                        </ul>
                    </div>
                </div>
                <div class="order-info">
                    <div class="order-infoL">
                        <p><span class="fontStyle1">配送方式</span><span class="fontStyle2">包邮</span></p>
                        <p><span class="fontStyle1">发票</span><span class="fontStyle2"><span>电子发票</span><span>个人</span><span>商品明细</span></span></p>
                    </div>
                    <div class="order-infoR">
                        <div class="content">
                            <div class="order-about"><div class="fontStyle3"><span>商品件数:</span></div><div class="fontStyle4"><span>{{totalQuantity}}件</span></div></div>
                            <div class="order-about"><div class="fontStyle3"><span>商品总价:</span></div><div class="fontStyle4"><span>{{totalPrice}}元</span></div></div>
                            <div class="order-about"><div class="fontStyle3"><span>优惠活动:</span></div><div class="fontStyle4"><span>0元</span></div></div>
                            <div class="order-about"><div class="fontStyle3"><span>运费:</span></div><div class="fontStyle4"><span>0元</span></div></div>
                            <div class="order-about"><div class="fontStyle3"><span>应付总额:</span></div><div class="fontStyle4"><span>{{totalPrice}}元</span></div></div>
                        </div>
                    </div>
                </div>
                <div class="order-btn">
                    <div class="btn-group btnStyle">
                        <a href="javascript:;" class="btn btn-large btn-go" @click="goCart">返回购物车</a>
                        <a href="javascript:;" class="btn btn-large" @click="orderSubmit">去结算</a>
                    </div>
                </div>
            </div>
            <!--删除弹框-->
            <modal
                    title="删除确认"
                    btnType="1"
                    modalType="middle"
                    :showModal="showDelModal"
                    v-on:submit="submitAddress"
                    v-on:cancel="showDelModal=false"
            >
                <template v-slot:body>
                    <p>您确认要删除地址吗？</p>
                </template>
            </modal>
            <modal
                    title="添加收货地址"
                    sureText="保存"
                    btnType="3"
                    modalType="middle"
                    v-bind:showModal="showAddrModal"
                    v-on:submit="submitAddress"
                    v-on:cancel="showModal=false"
            >
                <template v-slot:body>
                    <div class="addr-wrapper">
                        <div class="addr-item">
                            <input type="text" placeholder="姓名" class="name"  v-model="checkedItem.receiverName">
                            <input type="number" placeholder="手机号" class="tel" v-model="checkedItem.receiverMobile">
                        </div>
                        <div class="addr-item">
                            <select name="province" v-model="checkedItem.receiverProvince">
                                <option value="北京">北京</option>
                                <option value="天津">天津</option>
                                <option value="南京">南京</option>
                                <option value="重庆">重庆</option>
                            </select>
                            <select name="city" v-model="checkedItem.receiverCity">
                                <option value="北京">北京</option>
                                <option value="天津">天津</option>
                                <option value="南京">南京</option>
                                <option value="重庆">重庆</option>
                            </select>
                            <select name="disctrict" v-model="checkedItem.receiverDistrict">
                                <option value="北京">天河区</option>
                                <option value="天津">揭东区</option>
                                <option value="南京">端州区</option>
                                <option value="重庆">荔湾区</option>
                            </select>
                        </div>
                        <div class="addr-item">
                            <textarea name="street" v-model="checkedItem.receiverAddress"></textarea>
                        </div>
                        <div class="addr-item">
                            <input type="text" placeholder="邮政编号" class="post-office" v-model="checkedItem.receiverZip">
                        </div>
                    </div>
                    <div class="pro"></div>
                </template>
            </modal>
        </div>
    </div>

</template>
<script type="text/ecmascript-6">
    import Modal from "../components/Modal";
    import OrderHeader from './../components/OrderHeader'
    export default {
        components:{
          Modal,
          OrderHeader
        },
        data(){
            return{
                addrList:[],
                productList:[],
                totalPrice:'0',
                totalQuantity:0,
                showAddrModal:false, //弹出新增地址表单
                checkedItem:{}, // 选中的商品对象
                userAction:'',//用户行为：0：新增，1：编辑 2：删除
                showDelModal:false,//是否显示删除弹框
                checkIndex:0
            }
        },
        mounted(){
            this.getCartInfo();
            this.getAddress();
        },
        methods:{
            //商品列表
            getCartInfo(){
                this.axios.get('/carts').then((res)=>{
                    let list = res.cartProductVoList;
                    // let select = this.list.filter(item=>item.productSelected);
                    // if(select){
                    //     this.productList = res.cartProductVoList;
                    //     console.log(this.productList)
                    // }
                    this.productList = list.filter(item=>item.productSelected);
                    this.productList.map((item)=>{
                        this.totalQuantity += item.quantity;
                    });
                    this.totalPrice = res.cartTotalPrice;
                })
            },
            //地址列表
            getAddress(){
                this.axios.get('/shippings').then((res)=>{
                    this.addrList = res.list;
                    // console.log(this.addrList)
                })
            },
            //返回购物车
            goCart(){
                this.$router.push('/cart');
            },
            //删除地址
            delAddress(item){
                this.checkedItem = item;
                this.userAction = 2;
                this.showDelModal = true;
            },
            //添加地址
            addAddress(){
                this.checkedItem = {};//打开没有对象
                this.userAction = 0;
                this.showAddrModal = true;
            },
            editAddress(item){
                this.checkedItem = item;//打开没有对象
                this.userAction = 1;
                this.showAddrModal = true;
            },
            //地址删除、编辑、新增地址(0：新增，1：编辑 2：删除)
            submitAddress(){
                let {checkedItem,userAction} = this;//let item = this.checkedItem,userAction;
                console.log(this)
                let method,url,params;
                if (userAction == 0){
                    method = 'post';
                    url = '/shippings';
                }else if (userAction == 1){
                    method = 'put'
                    url = `/shippings/${checkedItem.id}`
                }else{
                    method = 'delete'
                    url = `/shippings/${checkedItem.id}`
                }
                if (userAction == 1 || userAction == 0){
                    let {receiverName,receiverMobile,receiverProvince,receiverCity,receiverDistrict,receiverAddress,receiverZip} = checkedItem;
                    let errMsg;
                    if (!receiverName){
                        errMsg = '请输入收货人名称！'
                    }else if(!receiverMobile || !/\d{11}/.test(receiverMobile)){
                        errMsg = '请输入正确的手机号格式！'
                    }else if (!receiverProvince){
                        errMsg = '请输入省份！'
                    }else if (!receiverCity){
                        errMsg = '请输入城市！'
                    }else if (!receiverDistrict){
                        errMsg = '请输入区/县！'
                    }else if (!receiverAddress){
                        errMsg = '请输入详细地址！'
                    }else if (!/\d{6}/.test(receiverZip) ){
                        errMsg = '请输入邮编号码！'
                    }
                    if (errMsg){
                        this.$message.error(errMsg);
                        return;
                    }
                    params = {
                        receiverName,
                        receiverMobile,
                        receiverProvince,
                        receiverCity,
                        receiverDistrict,
                        receiverAddress,
                        receiverZip,

                    }
                }
                this.axios[method](url,params).then(()=>{
                    this.closeModal();
                    // this.getCartInfo();
                    this.getAddress();
                    this.$message.success('操作成功');

                });
            },
            closeModal(){
                this.checkedItem = {};
                this.userAction = '';
                this.showAddrModal = false
                this.showDelModal = false;
            },
            //提交订单
            orderSubmit(){
                let i = this.addrList[this.checkIndex];
                if (!i){
                    this.$message.warning('请选择一个地址！');
                    return;
                }
                this.axios.post('/orders',{
                    shippingId:i.id
                }).then((res)=>{
                    this.$router.push({
                        path:'/order/pay',
                        query:{
                            orderNo:res.orderNo
                        }
                    })
                })

            }
        }

    }
</script>
<style lang="scss" scoped>
    @import "../assets/scss/mixin";
    .order-confirm{
        background: #e5e5e5;
        padding-top: 30px;
        padding-bottom: 200px;
        .container{
            background: white;
            padding-top: 38px;
            .addr{
                margin: 0px 82px 31px 63px;
                h4{
                    font-size: 20px;
                    font-weight: 400;
                    color: #333333;
                    margin-bottom: 21px;
                }
                .addr-information{
                    .addr-info{
                        box-sizing: border-box;
                        width: 270px;
                        height: 180px;
                        border: 1px solid #e5e5e5;
                        display: inline-block;
                        margin-right: 10px;
                        margin-bottom: 19px;
                        vertical-align: middle;
                        &.checked{
                            border: 1px solid #FF6600;
                        }
                        .addr-name,.addr-tel,.addr-detail{
                            display: inline-block;
                            width: 270px;
                        }
                        .addr-name{
                            padding: 15px 0 10px 15px;
                            font-size: 16px;
                            font-size: 16px;
                        }
                        .addr-tel,.addr-detail{
                            padding-left: 15px;
                            font-size: 14px;
                        }
                        .icon{
                            font-size: 18px;
                            font-weight: bold;
                            margin-top: 60px;
                            padding-left: 15px;
                            .icon-edi{
                                margin-left: 200px;
                                cursor: pointer;
                            }
                            .icon-del{
                                cursor: pointer;
                            }

                        }
                    }
                    .addr-add{
                        display: inline-block;
                        width: 270px;
                        height: 180px;
                        box-sizing: border-box;
                        border: 1px solid #e5e5e5;
                        text-align: center;
                        margin-right: 10px;
                        margin-bottom: 19px;
                        vertical-align: middle;
                        position: relative;
                        .add-operation{
                            position: absolute;
                            top:50%;
                            left: 50%;
                            transform: translate(-50%,-50%);
                            .add-icon {
                                width: 30px;
                                height: 30px;
                                background: #E0E0E0 url("../../public/imgs/icon-add.png") no-repeat center;
                                display: inline-block;
                                cursor: pointer;
                                border-radius: 50%;
                            }
                        }
                    }
                }
                .product{
                    display: block;
                    width: 100%;
                    .product-title{
                        font-size: 19px;
                        font-weight: bold;
                        border-bottom: 1px solid #e5e5e5;
                        margin-top: 20px;
                        padding-bottom: 15px;
                    }
                    ul{
                        width: 100%;
                        display: flex;
                        li{
                            border-bottom: 1px solid #e5e5e5;
                            display: inline-block;
                            padding: 10px 0;
                            height: 40px;
                            line-height: 40px;
                            font-size: 16px;
                            font-weight: 500;
                            img{
                                width: 40px;
                                vertical-align: middle;
                            }

                        }
                        .tprice{
                            color: #FF6600;
                        }
                    }

                }
            }
            .order-info{
                margin: 31px 24px 33px 63px;
                border-bottom: 1px solid #E5E5E5; ;
                .order-infoL{
                    p{
                        .fontStyle1{
                            font-size: 20px;
                            font-weight: 500;
                            color: #333333;
                            margin-right: 70px;
                            margin-bottom: 48px;
                            width: 149px;
                            display: inline-block;
                        }
                        .fontStyle2{
                            font-size: 16px;
                            font-weight: 400;
                            color: #FF6700;
                            span{
                                margin-right: 23px;
                            }

                        }
                    }
                }
                .order-infoR{
                    position: relative;
                    height: 193px;
                    .content{
                        width: 159px;
                        position: absolute;
                        right: 66px;
                        .order-about{
                            width: 100%;
                            font-size: 16px;
                            font-weight: 400;
                            color: #666666;
                            margin-bottom: 12px;
                            display: block;
                            &:nth-last-child(2){
                                margin-bottom: 21px;
                            }
                            .fontStyle3{
                                width: 50%;
                                display: inline-block;
                                position: relative;
                                span{
                                    display: inline-block;
                                    /*width: 100%;*/
                                    right: 0;
                                    position: absolute;
                                }
                            }
                            .fontStyle4{
                                color: #FF6700;
                                width: 50%;
                                display: inline-block;
                                position: relative;
                                span{
                                    display: inline-block;
                                    /*width: 100%;*/
                                    right: 0;
                                    position: absolute;
                                }
                            }

                        }
                    }

                }
            }
            .order-btn{
                width: 100%;
                height: 140px;
                position: relative;
                .btnStyle{
                    position: absolute;
                    right: 0;
                    .btn-go{
                        color: #999999;
                        background: white;
                        border: 1px solid #D7D7D7;
                    }
                }

            }
        }
        .addr-wrapper{

            .addr-item{
                input{
                    box-sizing: border-box;
                    width: 220px;
                    height: 40px;
                    margin-right: 15px;
                    display: inline-block;
                    border: 1px solid #cccccc;
                    padding-left: 20px;
                    margin-bottom: 15px;
                    &:last-child{
                        margin-right: 0;
                    }
                }
                select{
                    width: 80px;
                    height: 30px;
                    border: 1px solid #cccccc;
                    margin-bottom: 15px;
                }
                textarea{
                    border: 1px solid #cccccc;
                    width: 455px;
                    margin-bottom: 15px;
                }
            }
        }
    }
</style>
