<!-- 测试表格 复制页面把当前注释删除 -->
<template>
    <div class='table'>
        <search :config="searchConfig" v-model="searchValue" ref="search">
            <template #add>
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="getData">  新增 </el-button>
            </template>
            <template #searchBtn>
                <el-button type="primary" @click="initTableData">搜索</el-button>
                <el-button class="ml15" type="info" @click="reset">重置</el-button>
            </template>
        </search>
        <tablePage 
            ref="tablePage"
            url="/biz/content/article/findPage"
            :params="searchValue"
            :option="tableOption">
            <template v-slot:operating_btn="{ scope }">
                <el-button type="success" @click="getData(scope)">编辑</el-button>
                <el-button type="danger" @click="getData(scope)">删除</el-button>
            </template>
        </tablePage>
    </div>
</template>

<script>
import tablePage from '../../components/common/table/index';
import search from '../../components/common/table/search';
import { tableOption,searchConfig } from './config';
export default {
    components: {
        tablePage,
        search
    },
    data() {
        return {
            tableOption:tableOption,
            searchConfig:searchConfig,
            searchValue:{
                name:null,
                selectVal:null
            }
        };
    },
    methods: {
        //搜索
        initTableData(){
            this.$refs.tablePage.getPageData();
        },
        getData(data){
            this.$pageShow("dataStatusPage", data);
            // console.log(this.searchValue)
        },
        //重置
        reset(){
            this.$refs.search.searchReset();
            this.initTableData()
        }
    },
}
</script>
