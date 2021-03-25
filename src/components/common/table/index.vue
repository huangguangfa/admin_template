<template>
    <div class="table_page">
        <div class="table_c">
            <el-table
                :height="tabelConfig.height"
                :data="tableData"
                :border="tabelConfig.border"
                :stripe="tabelConfig.stripe"
                class="table"
                v-loading ='loading'
                ref="table_page"
                @selection-change="tableSelection"
                header-cell-class-name="table-header">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column  
                    v-for="( { prop,label,slot_name,fixed,text_over_flow,width } , index) in option"
                    :key="index"
                    :fixed="fixed"
                    align="center"
                    :prop="prop" 
                    :width="width"
                    :show-overflow-tooltip="text_over_flow"
                    :label="label">
                    <template slot-scope="scope">
                        <slot v-if="slot_name" :scope="scope" :name="slot_name"  />
                        <div v-else>
                            <span>{{ scope.row[prop] }}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination
                background
                layout="total,sizes, prev, pager, next"
                :page-sizes="[10,20,50,100,200]"
                @size-change='sizeChange' 
                @current-change="pageChange"
                :page-size="$parent.$parent.query.pageSize"
                :total="$parent.$parent.query.pageTotal" >
            </el-pagination>
        </div>
    </div>
</template>

 
<script>
    import ajax from '@/utils/ajax'
    export default{
        props:{
            //请求url
            url:{
                type:String,
                default:null
            },
            //请求方法
            requestType:{
                type:String,
                default:'POST'
            },
            //表头
            option:{
                type:Array,
                default:() => []
            },
            //表格配置
            tabelConfig:{
                type:Object,
                default:() => {
                    return {
                        stripe:true,
                        border:true,
                        height:null
                    }
                }
            },
            //请求参数
            params:{
                type:Object,
                default:() => {}
            }
        },
        data(){
            return {
                query: {
                    pageIndex: 1,
                    pageSize: 10,
                    pageTotal:20,
                },
                tableData: [],
                loading:false
            }
        },
        created(){
            this.getPageData()
        },
        methods:{
            async getPageData(){
                const { pageIndex,pageSize } = this.$parent.$parent.query;
                this.loading = true;
                let params = {
                    currentPage: pageIndex,
                    currentSize: pageSize,
                    ...this.params
                }
                const result =  this.requestType === "POST" ? await ajax.$post(this.url,params) : await ajax.$get(this.url,params);
                if(result.success){
                    this.loading = false;
                    this.tableData = result.pageDto.list;
                    this.$parent.$parent.pageTotal = result.pageDto.total;
                }else {
                    this.loading = false;
                    this.$message.error(result.message)
                }
            },
            // 表格勾选
            tableSelection(selet){
               this.$emit('tableSelection',selet)
            },
            //分页size变化
            sizeChange(size){
                this.$parent.$parent.query.pageSize = size;
                this.getPageData();
            },
            //分页变化
            pageChange(page){
                this.$parent.$parent.query.pageIndex = page;
                this.$emit('pageChange',page);
                this.getPageData()
            },
            // 清空勾选
            tableSelectionCancel(){
                this.$refs.table_page.clearSelection();
            }
        }
    }
</script>
 
<style scoped>
    .table_page{
        border: 1px solid #ddd;
        padding: 20px;box-sizing: border-box;background: #fff; border-radius: 7px;
    }
</style>