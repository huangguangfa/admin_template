<!-- 提示 -->
<template>
    <div class='Titlehint'>
        <span v-for="(item,index) in list" :key="index">{{ item }}</span>
    </div>
</template>

<script>

export default {
    props:{
        list:Array
    },
    components: {},
    data() {
        return {

        };
    },
    methods: {

    },
    created() {

    },
    mounted() {

    },
}
</script>
<style lang='less' scoped>
    .Titlehint{
        padding-top:10px; padding-bottom: 20px;
        span:nth-child(1){ font-size: 18px; color:#030202;}
        span:nth-child(1)::before{content:'';}
        span:nth-child(2){ font-size: 16px; color:#b6b6b6;}
        span:nth-child(3){ font-size: 14px; color:#b6b6b6;}
        span::before{content: '/';}
        
    } 
</style>