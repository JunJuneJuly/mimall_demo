<template>
    <div class="product">
        <product-param v-bind:title="product.name">
            <template v-slot:buy>
                <button class="btn" @click="buy()">立即购买</button>
            </template>
        </product-param>
        <div class="content">
            <div class="item-bg-1">
                <h2>{{product.name}}</h2>
                <h3>{{product.subtitle}}</h3>
                <p>
                    <a href="" id="">全球首款双频 GP</a>
                    <span>|</span>
                    <a href="" id="">骁龙845</a>
                    <span>|</span>
                    <a href="" id="">AI 变焦双摄</a>
                    <span>|</span>
                    <a href="" id="">红外人脸识别</a>
                </p>
                <div class="price">
                    <span>¥<em>{{product.price}}</em></span>
                </div>
            </div>
            <div class="item-bg-2">
                <div class="container">

                </div>
            </div>
            <div class="item-bg-3"></div>
            <div class="item-swiper">
                <swiper ref="mySwiper" v-bind:options="swiperOptions" class="swiperClass">
                    <swiper-slide v-for="(item, index) in swiperList" v-bind:key="index" class="swiper-item">
                        <a :href="'/#/product/'+item.id"><img :src="item.img" ></a>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <p class="desc">小米8 AI变焦双摄拍摄</p>
        </div>
        <div class="item-vedio">
            <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
            <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！
                <br/> 精准分析视频内容，15个场景智能匹配背景音效。</p>
            <div class="video-bg" @click="showSlide='slideDown'">
                <div class="container">
                    <img src="../../public/imgs/product/gallery-1.png" alt="">
                </div>
            </div>
            <div class="video-box" v-show="showSlide">
                <div class="overlay"></div>
                <div class="video" v-bind:class="showSlide">
                    <span class="icon_close" @click="closeVideo"></span>
                    <video  controls="controls" autoplay muted src="/imgs/product/video.mp4">
                        <!--<source src="/imgs/product/video.mp4" type="video/mp4">-->
                    </video>
                </div>
            </div>
        </div>
        <service-bar></service-bar>
    </div>
</template>
<script type="text/ecmascript-6">
    import {Swiper,SwiperSlide} from 'vue-awesome-swiper';
    import ProductParam from '../components/ProductParam';
    import ServiceBar from '../components/ServiceBar'
    export default {
        components:{
            ProductParam,
            ServiceBar,
            Swiper,
            SwiperSlide
        },

        data(){
            return{
                swiperList:[
                    {
                        id:'42',
                        img:'/imgs/product/gallery-2.png'
                    },
                    {
                        id:'45',
                        img:'/imgs/product/gallery-3.png'
                    },
                    {
                        id:'45',
                        img:'/imgs/product/gallery-4.png'
                    },
                    {

                        id:'45',
                        img:'/imgs/product/gallery-5.jpg'
                    },
                    {

                        id:'45',
                        img:'/imgs/product/gallery-6.jpg'
                    }
                ],
                swiperOptions: {
                    loop: true,//循环
                    slidesPerView: 3,
                    spaceBetween : 10,
                    speed: 2000,
                    autoplay: true,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true, //允许分页点击跳转
                    },

                },
                showSlide:'',
                product:{},
            }
        },
        mounted(){
            this.getProductInfo();
        },
        methods:{
            getProductInfo(){
                let id = this.$route.params.id;
                this.axios.get(`/products/${id}`).then((res)=>{
                    this.product = res;
                    console.log(res);
                })
            },
            closeVideo(){
                this.showSlide = 'slideUp';
                let vi = document.getElementsByTagName('video')[0];//关闭按钮把视频关掉。
                vi.pause();
                setTimeout(()=>{
                    this.showSlide=''
                },600)
            },
            buy(){
                let id = this.$route.params.id;
                this.$router.push(`/detail/${id}`);
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../assets/scss/mixin";
    .product{
        width: 100%;
        height: 100%;
        .content{
            .item-bg-1{
                background: url("../../public/imgs/product/product-bg-1.png") no-repeat center;
                text-align: center;
                width: 100%;
                height: 718px;
                h2{
                    font-size: 80px;
                    font-weight: 600;
                    color: #333333;
                    margin-top: 55px;
                    display: inline-block;
                    margin-bottom: 10px;
                }
                h3{
                    font-size: 24px;
                    font-weight: 300;
                    color: #333333;
                }
                p{
                    a{
                        font-size: 16px;
                        font-weight: 100;
                        color: #333333;
                        padding: 0 15px;
                    }
                }
                .price{
                    font-size: 38px;
                    font-weight: 400;
                    color: #333333;
                    em{
                        font-style: normal;
                    }
                }
            }
            .item-bg-2{
                width: 100%;
                .container{
                    background: url("../../public/imgs/product/product-bg-2.png") no-repeat center;
                    height: 397px;
                    background-size: contain;
                    margin: 38px auto 45px auto;
                    border: 1px dotted #999999;
                }
            }
            .item-bg-3{
                width: 100%;
                background: url("../../public/imgs/product/product-bg-3.png") no-repeat center;
                background-size: contain;
                height: 410px;
            }
            .item-swiper{
                width: 100%;
                height: 230px;
                margin-top: 35px;
                .swiperClass{
                    width: 100%;
                    .swiper-item{
                        width: 33%;
                        a{
                            display: inline-block;
                            width: 100%;
                            img{
                                margin-right: 10px;
                                width: 100%;
                                height: 230px;
                            }
                        }
                    }
                }
            }
            p{
                text-align: center;
                font-size: 18px;
                font-weight: 400;
                color: #333333;
                margin-top: 20px;
            }
        }
        .item-vedio{
            width: 100%;
            background: #070708;
            text-align: center;
            margin-top: 30px;
            h2{
                font-size: 60px;
                font-weight: 500;
                color: #FFFFFF;
                padding: 30px 0;
            }
            p{
                font-size: 24px;
                font-weight: 300;
                color: #FFFFFF;
                margin-bottom: 30px;
            }
            .video-bg{
                .container{
                    img{
                        width: 100%;
                        margin-bottom: 120px;
                        cursor: pointer;
                    }
                }
            }
            .video-box{
                .overlay{
                    @include position();
                    z-index: 15;
                    background: rgba(51, 51, 51, 0.3);
                }
                @keyframes slideDown {
                    from{
                        top:-50%;
                        opacity: 0;
                    }
                    to{
                        top: 50%;
                        opacity: 1;
                    }
                }
                @keyframes slideUp {
                    from{
                        top:50%;
                        opacity: 1;
                    }
                    to{
                        top: -50%;
                        opacity: 0;
                    }
                }
                .video{
                    z-index: 15;
                    opacity: 0;
                    position: fixed;
                    width: 1000px;
                    height: 536px;
                    top: -50%;
                    left: 50%;
                    translate:-50% -50%;
                    transition: all .5s;
                    /*&.slide{*/
                        /*top:50%;*/
                        /*opacity: 1;*/
                    /*}*/
                    &.slideDown{
                        animation: slideDown .6s linear;
                        top:50%;
                        opacity: 1;
                    }
                    &.slideUp{
                        animation: slideUp .6s linear;
                        top:-50%;
                        opacity: 0;
                    }
                    video{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;//删除视频自带的阴影效果
                        outline: none;
                    }
                    .icon_close{
                        z-index: 20;
                        position: absolute;
                        top:15px;
                        right: 15px;
                        cursor: pointer !important;
                        @include bgImg(15px,15px,'/imgs/icon-close.png')
                    }

                }

            }
        }
    }

</style>
<!--<style lang="scss">-->
    <!--.swiper-pagination-customs {-->
        <!--width: 1.5rem;-->
        <!--height: 0.14rem;-->
        <!--display: inline-block;-->
    <!--}-->
    <!--/*自定义分页器激活时的样式表现*/-->
    <!--.swiper-pagination-customs-active {-->
        <!--width: 1.5rem;-->
        <!--height: 0.14rem;-->
        <!--display: inline-block;-->
        <!--border-radius: 0.07rem;-->
        <!--background-color: #28a7e1;-->
    <!--}-->
<!--</style>-->
