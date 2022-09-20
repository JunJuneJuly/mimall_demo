<template>
    <div class="index">
        <div class="content">
            <div class="swiper-box">
                <div class="nav-menu">
                    <ul class="item-menu">
                        <li class="menu">
                            <div class="wrapper-content">
                                <a href="javascript:;">手机 电话卡</a>
                                <span></span>
                            </div>
                            <div class="children">
                                <ul v-for="(item,i) in menuList" :key="i" class="child-item">
                                    <li v-for="(sub,j) in item" :key="j" class="child">
                                        <a href=""><img :src="sub?sub.img:'/imgs/item-box-1.png'" alt=""><span>{{sub?sub.name:'小米9'}}</span></a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="menu">
                            <div class="wrapper-content">
                                <a href="javascript:;">电视 盒子</a>
                                <span></span>
                            </div>
                            <div class="children">

                            </div>
                        </li>
                        <li class="menu">
                            <div class="wrapper-content">
                                <a href="javascript:;">笔记本 平板</a>
                                <span></span>
                            </div>
                            <div class="children">

                            </div>
                        </li>
                        <li class="menu">
                            <div class="wrapper-content">
                                <a href="javascript:;">家电 插线板</a>
                                <span></span>
                            </div>
                            <div class="children">

                            </div>
                        </li>
                        <li class="menu">
                            <div class="wrapper-content">
                                <a href="javascript:;">出行 穿戴</a>
                                <span></span>
                            </div>
                            <div class="children">

                            </div>
                        </li>
                        <li class="menu">
                            <div class="wrapper-content">
                                <a href="javascript:;">耳机 音箱</a>
                                <span></span>
                            </div>
                            <div class="children">

                            </div>
                        </li>
                        <li class="menu">
                            <div class="wrapper-content">
                                <a href="javascript:;">电源 配件</a>
                                <span></span>
                            </div>
                            <div class="children">

                            </div>
                        </li>
                        <li class="menu">
                            <div class="wrapper-content">
                                <a href="javascript:;">生活 箱包</a>
                                <span></span>
                            </div>
                            <div class="children">

                            </div>
                        </li>
                    </ul>
                </div>
                <swiper ref="mySwiper" v-bind:options="swiperOptions">
                <swiper-slide v-for="(item, index) in swiperList" v-bind:key="index">
                    <a :href="'/#/product/'+item.id"><img :src="item.img" ></a>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
            </div>
            <div class="ads-box">
                <a :href="'/#/product/'+item.id" v-for="(item,idx) in adsList" :key="idx" class="adsList">
                    <img v-lazy="item.img" alt="">
                </a>
            </div>
            <div class="banner">
                <a href="#"><img v-lazy="banner.img" alt=""></a>
            </div>
        </div>
        <div class="product-box">
            <div class="wrapper-content">
                <h2>手机</h2>
                <div class="w-content">
                    <div class="banner-left"><img v-lazy="'/imgs/mix-alpha.jpg'" alt=""></div>
                    <div class="list-box">
                        <div class="list" v-for="(arr,i) in phoneList" :key="i">
                            <div class="item" v-for="(item,j) in arr" :key="j">
                                <span v-bind:class="{'new-pro':j%2==0}">新品</span>
                                <img v-lazy="item.mainImage" alt="">
                                <div class="item-info">
                                    <h3>{{ item.name}}</h3>
                                    <p class="info">{{item.subtitle}}</p>
                                    <p class="price" @click="addCart(item.id)">{{item.price}}元</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ServiceBar></ServiceBar>
        <modal
            title="提示"
            sureText="查看购物车"
            btnType="1"
            modalType="middle"
            v-bind:showModal="showModal"
            v-on:submit="goToCart"
            v-on:cancel="showModal=false"
            >
            <template v-slot:body>
                <p>商品添加成功</p>
            </template>
        </modal>
    </div>
</template>

<script>
    import ServiceBar from './../components/ServiceBar';
    import Modal from './../components/Modal'
    import {Swiper,SwiperSlide} from 'vue-awesome-swiper'
    export default {
        name:'index',
        components:{
            ServiceBar,
            Modal,
            Swiper,
            SwiperSlide
        },
        data(){
            return {
                swiperList:[
                    {
                        id:'45',
                        img:'/imgs/slider/slide-1.jpg'
                    },
                    {
                        id:'42',
                        img:'/imgs/slider/slide-2.jpg'
                    },
                    {
                        id:'45',
                        img:'/imgs/slider/slide-3.jpg'
                    },
                    {
                        id:'45',
                        img:'/imgs/slider/slide-4.jpg'
                    },
                    {

                        id:'45',
                        img:'/imgs/slider/slide-5.jpg'
                    }
                ],
                menuList:[
                    [
                        {
                            id:'30',
                            img:'/imgs/item-box-1.png',
                            name:'小米9'
                        },
                        {
                            id:'31',
                            img:'/imgs/item-box-2.png',
                            name:'小米9'
                        },
                        {
                            id:'32',
                            img:'/imgs/item-box-3.jpg',
                            name:'小米9'
                        },
                        {
                            id:'3',
                            img:'/imgs/item-box-4.jpg',
                            name:'小米9'
                        }
                    ],
                    [
                        0,0,0,0
                    ],
                    [
                        0,0,0,0
                    ],
                    [
                        0,0,0,0
                    ],
                    [
                        0,0,0,0
                    ],
                    [
                        0,0,0,0
                    ]
                ],
                adsList:[
                    {
                        id:'33',
                        img:'/imgs/ads/ads-1.png'
                    },
                    {
                        id:'48',
                        img:'/imgs/ads/ads-2.jpg'
                    },
                    {
                        id:'45',
                        img:'/imgs/ads/ads-3.png'
                    },
                    {
                        id:'47',
                        img:'/imgs/ads/ads-4.jpg'
                    },
                ],
                banner:{
                  id:'31',
                  img:'./imgs/banner-1.png'
                },
                phoneList:[

                ],
                showModal:false,
                swiperOptions: {
                    loop: true,//循环
                    speed: 2000,
                    autoplay: true,
                    effect : 'cube',
                    cubeEffect: {
                        shadowOffset: 20,
                        shadowScale: 0.6
                    },
                    // 显示分页
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true, //允许分页点击跳转
                    },
                    // 设置点击箭头
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    // 修改默认点击左右箭头样式
                    // navigation: {
                    // nextEl: ".swiper-button-next",
                    //prevEl: ".swiper-button-prev",
                    //},
                },
            }
        },
        mounted(){
            this.init();
        },
        methods: {
            init(){
                this.axios.get('/products',{
                    params:{
                        categoryId:'100012',
                        pageSize:'8'
                    }
                }).then((res)=>{
                    this.phoneList = [(res.list.slice(0,4)),(res.list.slice(4,8))];
                    // console.log(this.phoneList);
                })
            },
            addCart(id){
                this.axios.post('/carts',{
                    productId:id,
                    selected:true
                }).then((res={})=>{
                    this.showModal = true;
                    this.$store.dispatch('saveCartCount',res.cartTotalQuantity);
                    // this.$router.push('/cart');
                    // console.log(res)
                }).catch(()=>{
                    this.showModal = true
                })
            },
            goToCart(){
                this.$router.push('/cart');
            }

        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/mixin";
    .index{
        .content{
            margin-right: auto;
            margin-left: auto;
            width: 1226px;
            /*overflow: hidden;*/
            .swiper-box{
                height: 451px;
                width: 1226px;
                .swiper-container{
                    height: 451px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .swiper-button-prev{
                    left: 274px;
                }
                .nav-menu{
                    position: absolute;
                    width: 264px;
                    height: 451px;
                    z-index: 10;
                    background: #6666667a;
                    .item-menu{
                        display: flex;
                        flex-direction: column;
                        padding-top: 26px;
                        position: relative;
                        .menu{
                            .wrapper-content{
                                height: 50px;
                                line-height: 50px;
                                padding-left: 30px;
                                position: relative;
                                a{
                                    font-size: 16px;
                                    font-family: FZLanTingHeiS-R-GB;
                                    font-weight: 400;
                                    color: #FFFFFF;
                                    height: 100%;
                                    position: absolute;
                                }
                                span{
                                    display: inline-block;
                                    @include bgImg(10px,10px,"../../public/imgs/icon-arrow.png");
                                    position: absolute;
                                    right: 30px;
                                    top: 40%;
                                }
                            }
                            &:hover{
                                background: #FF6600;
                                .children{
                                    height:451px;
                                    background: white;
                                    box-shadow: 0px 7px 6px 0px rgba(0,0,0,0.11);
                                }
                            }
                            .children{
                                height: 0px;
                                overflow: hidden;
                                box-sizing: border-box;
                                left: 264px;
                                top:0px;
                                width: 964px;
                                position: absolute;
                                padding-left: 23px;
                                padding-top: 14px;
                                transition: all .5s;
                                .child-item{
                                    width: 100%;
                                    display: flex;
                                    flex-direction: row;
                                    height: 75px;
                                    .child{
                                        display: inline;
                                        width: 25%;
                                        height: 100%;
                                        a{
                                            display: inline-block;
                                            height: 100%;
                                            font-size: 14px;
                                            font-family: FZLanTingHeiS-R-GB;
                                            font-weight: 400;
                                            color: #333333;
                                            line-height: 60px;
                                            img{
                                                height: 42px;
                                                width: 35px;
                                                vertical-align: middle;
                                            }
                                            span{
                                                display: inline-block;
                                                height: 100%;

                                            }
                                        }

                                    }
                                }
                            }

                        }

                    }
                }
            }
            .ads-box{
                display: flex;
                justify-content: space-between;
                height: 167px;
                width: 1226px;
                margin-top: 14px;
                .adsList{
                    height: 167px;
                    width: 296px;
                    img{
                        height: 100%;
                        width: 100%;
                    }
                }
            }
            .banner{
                margin-top: 31px;
                margin-bottom: 50px;
                a{
                    img{
                        height: 130px;
                    }
                }
            }
        }
        .product-box{
            background: #F5F5F5;
            .wrapper-content{
                margin-right: auto;
                margin-left: auto;
                width: 1226px;
                padding: 30px 0 50px;
                h2{
                    font-size: 22px;
                    font-family: FZLanTingHeiS-R-GB;
                    font-weight: 400;
                    color: #333333;
                    margin-bottom: 20px;
                }
                .w-content{
                    display: flex;
                    width: 100%;
                    height: 619px;
                    box-sizing: border-box;
                    .banner-left{
                        width: 224px;
                        height: 619px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .list-box{
                        width: 1002px;
                        margin-left: 16px;
                        cursor: pointer;
                        .list{
                            display: flex;
                            justify-content: space-around;
                            width: 100%;
                            margin-bottom: 14px;
                            &:last-child{
                                margin-bottom: 0;
                            }
                            .item{
                                width: 236px;
                                height: 302px;
                                background: white;
                                text-align: center;
                                span{
                                    display: inline-block;
                                    width: 67px;
                                    height: 24px;
                                    line-height: 24px;
                                    font-size: 14px;
                                    color:#ffffff;
                                    margin-bottom: 20px;
                                    &.kill-pro{
                                        background: #F20A0A;
                                    }
                                    &.new-pro{
                                        background: #7ECF68;
                                    }

                                }
                                img{
                                    width: 195px;
                                    height: 134px;
                                }
                                .item-info{
                                    padding-top: 15px;
                                    h3{
                                        font-size: 14px;
                                        font-family: FZLanTingHeiS-R-GB;
                                        font-weight: 400;
                                        color: #333333;
                                    }
                                    .info{
                                        font-size: 12px;
                                        font-family: FZLanTingHeiS-R-GB;
                                        font-weight: 400;
                                        color: #999999;
                                        margin-bottom: 13px;
                                    }
                                    .price{
                                        font-size: 14px;
                                        font-family: FZLanTingHeiS-R-GB;
                                        font-weight: 400;
                                        color: #F20A0A;
                                        &:after{
                                            content: ' ';
                                            @include bgImg(12px,16px,"../../public/imgs/icon-cart-hover.png");
                                            padding-left: 5px;

                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }
    }
</style>
