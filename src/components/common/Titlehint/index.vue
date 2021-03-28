<!-- 提示 -->
<template>
    <div class='Titlehint'>
        <div>
            <span v-for="(item,index) in list" :key="index">{{ item }}</span>
        </div>
        <div v-show="show">
            <el-button icon="iconfont ranqi_iconfanhui" @click="backTrack" size="mini">返回</el-button>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        list:{ //详情数据
            type:Array,
            default:() =>{
                return ['详情','详情']
            }
        },          
        show:{              //是否显示
            type:Boolean,
            default:false
        },
        isData:{            //传输的数据
            type:Object,
            default:() =>{
                return {}
            }
        },
    },
    methods: {
        backTrack(){
            this.$EventBus.$emit('switchPage',this.isData);
        }
    }
}
</script>
<style lang='less' scoped>
    .Titlehint{
        height: 33px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > div:nth-child(1){
            span:nth-child(1){ font-size: 18px; color:#030202;}
            span:nth-child(1)::before{content:'';}
            span:nth-child(2){ font-size: 16px; color:#b6b6b6;}
            span:nth-child(3){ font-size: 14px; color:#b6b6b6;}
            span:nth-child(4){ font-size: 14px; color:#b6b6b6;}
            span:nth-child(5){ font-size: 14px; color:#b6b6b6;}
            span::before{content: '/';}
        }
    } 
</style>