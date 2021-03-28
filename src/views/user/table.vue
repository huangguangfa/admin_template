<!-- 测试表格 复制页面把当前注释删除 -->
<template>
    <div class='table'>
        <search :config="searchConfig" v-model="searchValue" ref="search">
            <template #add>
                <el-button type="primary" icon="iconfont ranqi_icondh23" @click="getData">  新增 </el-button>
                <el-button type="primary" icon="iconfont ranqi_icondh21" @click="getData">  导出 </el-button>
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
                <el-dropdown>
                    <el-button type="primary" size="mini"  plain class="iconfont icon-caozuo" @click.stop >操作配置</el-button>
                    <el-dropdown-menu slot="dropdown" class="table-operate">
                        <el-dropdown-item>
                            <el-button type="success" icon="iconfont ranqi_iconxingzhuang995kaobei"  @click="getData(scope)">编辑</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <el-button type="danger" icon="iconfont ranqi_iconshanchu2" @click="getData(scope)">删除</el-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
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
                phone:null,
                date:null
            }
        };
    },
    methods: {
        //搜索
        initTableData(){
            this.$refs.tablePage.getPageData();
        },
        getData(data){
            this.$pageShow("dataStatusPage", {
                type:0,
                data
            });
        },
        //重置
        reset(){
            this.$refs.search.searchReset();
            this.initTableData()
        }
    },
}
</script>
