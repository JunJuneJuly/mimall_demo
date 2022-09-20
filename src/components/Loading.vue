<template>
    <div class="loading">
        <img src="/imgs/loading-svg/loading-bars.svg" alt="">
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name:'loading'
    }
</script>
<style lang="scss" scoped>
    .loading{
        text-align: center;
        width: 100%;
        height: 200px;
        line-height: 200px;
        img{
            height: 80px;
            line-height: 80px;
            vertical-align: middle;
        }
    }
</style>