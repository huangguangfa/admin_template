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
