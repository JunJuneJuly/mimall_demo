<template>
    <Transition name="slide">
        <div class="scan-pay">
            <div class="mask"></div>
            <div class="scan-content">
                <div class="img-phone"><img src="../../public/imgs/pay/icon-scan.png" alt=""></div>
                <div class="scan-code">
                    <div class="title">微信支付<em @click="close"></em></div>
                    <div class="code"><img :src="img" alt=""></div>
                    <div class="footer">
                        <p>请使用<span class="fz">微信</span>扫一扫</p>
                        <p>二维码完成支付</p>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
<script type="text/ecmascript-6">
    export default {
        name:'scan-pay',
        props:['img'],
        methods:{
            close(){
                this.$emit('close');
            }
        }
    }
</script>
<style lang="scss">
    @import "../assets/scss/mixin";
    .scan-pay{
        z-index: 10;
        @include position();
        transition: all .5s;
        .mask{
            @include position();
            background: #000000;
            opacity: 0.5;
            }
        &.slide-enter-active{
            top:0;
        }
        &.slide-enter{
            top:-100%;
        }
        &.slide-leave-to{
            top: -100%;
        }
        .scan-content {
            width: 700px;
            position: absolute;
            top: 50%;
            left: 50%;
            translate: -50% -50%;
            .img-phone {
                display: inline-block;
                vertical-align: middle;
                img{
                    width: 296px;
                    /*vertical-align: middle;*/
                }

            }
            .scan-code{
                vertical-align: middle;
                display: inline-block;
                background: white;
                /*height: 440px;*/
                .title{
                    width: 370px;
                    height: 60px;
                    font-size: 20px;
                    font-weight: 300;
                    color: #333333;
                    line-height: 60px;
                    padding-left: 18px;
                    position: relative;
                    em{
                        cursor: pointer;
                        width: 13px;
                        height: 139px;
                        @include bgImg(13px,13px,'/imgs/icon-close.png');
                        position: absolute;
                        right: 23px;
                        top: 23px;
                    }
                }
                .code{
                    padding: 44px 66px 26px 67px;
                    img{
                        width: 237px;
                        height: 240px;
                    }
                }
                .footer{
                    text-align: center;
                    font-size: 14px;
                    font-weight: 300;
                    color: #333333;
                    padding-bottom: 34px;
                    .fz{
                        color: #FF6600;
                    }
                }

            }
        }
    }
</style>