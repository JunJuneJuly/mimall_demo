<template>
    <div class="no-data">
        <img src="../../public/imgs/icon-no-data.png" alt="">
        <p>暂无提交的订单记录</p>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name:'no-data',

    }
</script>
<style lang="scss" scoped>
    .no-data{
        height: 400px;
        text-align: center;
        img{
            width: 260px;
            margin: 100px 0 50px 0;
        }
        p{
            font-size: 20px;
            font-weight: 300;
            color: #999999;
        }
    }
</style>