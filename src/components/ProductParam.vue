<template>
    <div class="productparam">
        <div class="nav-bar" :class="{'is_Fixed':isFixed}">
            <div class="container">
                <div class="pro-title">{{title}}</div>
                <div class="pro-param">
                    <a href="javascript:;">概述</a><span>|</span>
                    <a href="javascript:;">参数</a><span>|</span>
                    <a href="javascript:;">用户评价</a>
                    <slot name="buy"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name:'productparam',
        props:{
            title:String,
        },
        data(){
            return{

                isFixed:false
            }
        },
        mounted(){
            window.addEventListener('scroll',this.initHeight)
        },
        methods:{
            initHeight(){
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                this.isFixed = scrollTop > 152 ? true:false;
            }
        },
        destroyed(){
            window.removeEventListener('scroll',this.initHeight,false)
        }

    }
</script>
<style lang="scss" scoped>
    @import "../assets/scss/config";
    @import "../assets/scss/mixin";
    .productparam{
        .nav-bar{
            border-top: 1px solid #E5E5E5;
            height: 70px;
            line-height: 70px;
            background: white;
            &.is_Fixed{
                position: fixed;
                top: 0;
                width: 100%;
                box-shadow: 0 2px 2px #cccccc;
                z-index: 20;
            }
            .container{
                @include flex();
                /*display: flex;*/
                /*justify-content: space-between;//space-between两头对齐*/
                .pro-title{
                    font-size: 18px;
                    font-weight: 400;
                    color: #333333;
                }
                .pro-param{
                    font-size: 14px;
                    font-weight: 400;
                    a{
                        color: #666666;
                        margin: auto 11px;
                    }

                }
            }
        }
        .c{
            height: 200px;
            background: #FF6600;
        }
    }

</style>