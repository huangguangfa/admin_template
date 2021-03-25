<template>
    <div class="handle_table_data">
         <Titlehint 
            :list="['排班管理','规则审核','审核']"
            :show="true"
            :isData="{ activeName:'tableModule' }">
        </Titlehint>
        <div class="handle_table_data_box">
            <div class="handle_table_data_title"> 新增 </div>
            <div class="handle_table_data_content">
                <table class="tablelist">
                    <tr>
                        <td class="h_row_item_label necessary"> 巡查名称 </td>
                        <td class="h_row_item_value">
                            <div class="h_row_item_value_box">
                                <el-input v-model="value" placeholder="输入值"></el-input>
                            </div>
                        </td>
                        <td class="h_row_item_label necessary"> 巡查名称 </td>
                        <td class="h_row_item_value">
                            <div class="h_row_item_value_box">
                                <el-input v-model="value" placeholder="输入值"></el-input>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="h_row_item_label necessary"> 巡查名称 </td>
                        <td class="h_row_item_value">
                            <div class="h_row_item_value_box">
                                <el-input v-model="value" placeholder="输入值"></el-input>
                            </div>
                        </td>
                        <td class="h_row_item_label necessary"> 巡查名称 </td>
                        <td class="h_row_item_value">
                            <div class="h_row_item_value_box">
                                <el-input v-model="value" placeholder="输入值"></el-input>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        
    </div>  
</template>

<script>
export default {
    data(){
        return {
            value:null
        }
    }
}
</script>


<style lang="less" scoped>
.handle_table_data{
    
    .handle_table_data_box{
        padding: 20px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 6px;
        .handle_table_data_title{
            position: relative; margin-bottom: 20px; height: 20px;
            font-size: 16px;
            &::before{
                position: absolute;
                content: "";
                background: #51c782;
                width: 5px;
                height: 5px;
                border-radius: 100%;
                left: -10px;
                top: 50%;
                margin-top: -5px;
            }
        }
        .handle_table_data_content{
            border: 1px solid #cdd7df;
            .tablelist{
                width: 100%;
                tr{
                    border-bottom: 1px solid #cdd7df;width: 100%;
                    td{  height: 0; vertical-align: middle; }
                    .h_row_item_label{
                        font-size: 12px;
                        width: 100px;
                        background: #f6fafa;
                        line-height: 1.4;
                        text-align: center;
                        box-sizing: border-box;
                        padding: 15px 20px;
                        border-right: 1px solid #cdd7df;
                    }
                    .necessary{
                        position: relative;
                        &::after{
                            content: '*';
                            position: absolute;
                            left: 15px;
                            color: red;
                        }
                    }
                    .h_row_item_value{
                        .h_row_item_value_box{
                            height: 100%; display: flex; align-items: center;
                            /deep/ .el-input--mini .el-input__inner{ height: 100% !important;border: none !important; }
                            /deep/ .el-input{ height: 100% !important; border-right: 1px solid #cdd7df; min-width: 300px; }
                        }
                    }
                    td:last-child{
                        .h_row_item_value_box{
                            /deep/ .el-input{ border-right:none; }
                        }
                    }
                }
                tr:last-child{
                    border: none;
                }   
            }
        }
    }
    
}
</style>