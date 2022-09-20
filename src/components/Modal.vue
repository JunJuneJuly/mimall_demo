<template>
    <Transition name="slide">
        <div class="modal" v-show="showModal">
            <div class="mask"></div>
            <div class="modal-dailog">
                <div class="modal-header">
                    <span>{{title}}</span>
                    <a href="javascript:;" class="icon-close"><img src="../../public/imgs/icon-close.png" alt="" v-on:click="$emit('cancel')"></a>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <a href="javascript:;" class="btn" v-if="btnType==1" v-on:click="$emit('submit')">{{sureText}}</a>
                    <a href="javascript:;" class="btn btn-default" v-if="btnType==2" v-on:click="$emit('cancel')">{{cancelText}}</a>
                    <div class="btn-group" v-if="btnType==3">
                        <a href="javascript:;" class="btn" v-on:click="$emit('submit')">{{sureText}}</a>
                        <a href="javascript:;" class="btn btn-default" v-on:click="$emit('cancel')">{{cancelText}}</a>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
<script type="text/ecmascript-6">
    export default {
        name:'modal',
        props:{
            //弹框类型：1（小）；2（中）；3（大）；form
            modalType:{
                type:String,
                default:'form'
            },
            //弹框标题
            title:String,
            //按钮类型：1确定按钮；2取消按钮；3确定取消
            btnType:String,
            sureText:{
                type: String,
                default: '确定'
            },
            cancelText:{
                type: String,
                default: '取消'
            },
            showModal:Boolean,
        },
        methods:{
            closeModal(){
                this.showModal = false;
            }
        }
    }
</script>
<style lang="scss">


</style>