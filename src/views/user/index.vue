<!-- 测试表格 复制页面把当前注释删除 -->
<template>
    <div class="table_model">
        <transition name="slide-left" mode="out-in">
            <component :is="activeName" :isData="TitlehintData"></component>
        </transition>
    </div>
</template>

<script>
import dataStatusPage from './dataStatusPage'
import tableModule from './table'
import { switchPage } from "@/utils/mixins";
export default {
    mixins: [ switchPage ],
    components: {
        dataStatusPage,
        tableModule
    },
    data() {
        return {
            activeName: "tableModule", //活跃组件
            TitlehintData: {},
            query: {
                pageIndex: 1,
                pageSize: 10,
                pageTotal:20,
            }
        };
    },
    mounted() {
        
    },
    created() {

    },
    methods: {
        getData(data){
            console.log(data)
        }
    },
}
</script>
<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
