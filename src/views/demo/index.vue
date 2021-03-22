<!-- 测试表格 复制页面把当前注释删除 -->
<template>
    <div class='table'>
        <!-- 提示 -->
        <Titlehint :list="titleText"></Titlehint>
        <!-- 表格内容 -->
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus"
                    class="handle-del mr10"
                    @click="addData"
                >新增</el-button>
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                >批量删除</el-button>
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column label="账户余额">
                    <template slot-scope="scope">￥{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column label="头像/查看" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.thumb"
                            :preview-src-list="[scope.row.thumb]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="date" label="注册时间"></el-table-column>
                <el-table-column label="操作" width="280" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            @click="compile(scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="danger"
                            size="mini"
                            icon="el-icon-delete"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="query.pageTotal"
                ></el-pagination>
            </div>
        </div>
        
        <!-- 表格数据修改 -->
        <dataStatusPage ref="dataStatusPage" :childrenData="childrenData" />
    </div>
</template>

<script>
import dataStatusPage from './dataStatusPage'
export default {
    components: {
        dataStatusPage,
    },
    data() {
        return {
            titleText:['测试','测试1','测试2'],
            query: {
                pageIndex: 1,
                pageSize: 10,
                pageTotal:20,
            },
            tableData: [
                {
                    "id": 1,
                    "name": "张三",
                    "money": 123,
                    "address": "广东省东莞市长安镇",
                    "state": "成功",
                    "date": "2019-11-1",
                    "thumb": "https://lin-xin.gitee.io/images/post/wms.png"
                },
                {
                    "id": 2,
                    "name": "李四",
                    "money": 456,
                    "address": "广东省广州市白云区",
                    "state": "成功",
                    "date": "2019-10-11",
                    "thumb": "https://lin-xin.gitee.io/images/post/node3.png"
                },
                {
                    "id": 2,
                    "name": "李四",
                    "money": 456,
                    "address": "广东省广州市白云区",
                    "state": "成功",
                    "date": "2019-10-11",
                    "thumb": "https://lin-xin.gitee.io/images/post/node3.png"
                },
                {
                    "id": 3,
                    "name": "王五",
                    "money": 789,
                    "address": "湖南省长沙市",
                    "state": "失败",
                    "date": "2019-11-11",
                    "thumb": "https://lin-xin.gitee.io/images/post/parcel.png"
                },
                {
                    "id": 4,
                    "name": "赵六",
                    "money": 1011,
                    "address": "福建省厦门市鼓浪屿",
                    "state": "成功",
                    "date": "2019-10-20",
                    "thumb": "https://lin-xin.gitee.io/images/post/notice.png"
                },
                {
                    "id": 1,
                    "name": "张三",
                    "money": 123,
                    "address": "广东省东莞市长安镇",
                    "state": "成功",
                    "date": "2019-11-1",
                    "thumb": "https://lin-xin.gitee.io/images/post/wms.png"
                },
                {
                    "id": 3,
                    "name": "王五",
                    "money": 789,
                    "address": "湖南省长沙市",
                    "state": "失败",
                    "date": "2019-11-11",
                    "thumb": "https://lin-xin.gitee.io/images/post/parcel.png"
                },
                {
                    "id": 2,
                    "name": "李四",
                    "money": 456,
                    "address": "广东省广州市白云区",
                    "state": "成功",
                    "date": "2019-10-11",
                    "thumb": "https://lin-xin.gitee.io/images/post/node3.png"
                },
                {
                    "id": 2,
                    "name": "李四",
                    "money": 456,
                    "address": "广东省广州市白云区",
                    "state": "成功",
                    "date": "2019-10-11",
                    "thumb": "https://lin-xin.gitee.io/images/post/node3.png"
                },
            ],
            childrenData:{}
        };
    },
    mounted() {

    },
    created() {

    },
    methods: {
        compile(data){
            this.$refs.dataStatusPage.dialogVisible = true;
            this.childrenData = data;
        },
        addData(){
            this.$refs.dataStatusPage.dialogVisible = true;
            this.childrenData = {};
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
