<template>
    <div class="ali-pay">
        <order-header title="支付宝支付">
            <template v-slot:tip><span>请谨防钓鱼链接或诈骗电话，了解更多</span></template>
        </order-header>
        <loading v-if="showLoading"></loading>
        <div class="form" v-html="content"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    import Loading from '../components/Loading';
    import OrderHeader from '../components/OrderHeader'
    export default {
        name:'alipay',
        components:{
          Loading,
          OrderHeader
        },
        data(){
            return{
                // orderId:this.$route.query.orderId,
                content:'',
                showLoading:true,
            }
        },
        mounted(){
            this.paySubmit();
        },
        methods:{
            paySubmit(){
                let orderId = this.$route.query.orderId;
                this.axios.post('/pay',{
                    orderId:orderId,
                    orderName:'Vue小米高仿商城',
                    amount:0.01,
                    payType:1
                }).then((res)=>{
                    this.content = res.content;

                    setTimeout(()=>{
                        document.forms[0].submit();
                    },100)
                })

            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
