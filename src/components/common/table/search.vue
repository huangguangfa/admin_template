<template>
    <div class="search">
        <div class="search_condition_config" v-for="({ label,key,tag,prefixIcon,option,slot_name },index) in config" :key="index">
            <template v-if="slot_name">
                <slot :name="slot_name"></slot>
            </template>
            <template v-else>
                <span class="search_label">{{ label }}：</span>
                <el-input   v-if="tag === 'input'" :prefix-icon="prefixIcon" clearable  v-model="value[key]" :placeholder="`输入${label}`"></el-input>
                <el-select  v-if="tag === 'select'" v-model="value[key]" :placeholder="`选择${label}`" clearable>
                    <el-option v-for="item in option" :key="item.value" :label="item.label"  :value="item.value"> </el-option>
                </el-select>
               <el-date-picker 
                    format="yyyy-MM-dd" 
                    value-format="yyyy-MM-dd" 
                    v-if="tag === 'date'" 
                    v-model="value[key]" 
                    type="date" 
                    :placeholder="`选择${label}`"> 
               </el-date-picker>
            </template>
        </div>
    </div>
</template>

<script>
export default{
    props:{
        config:{
            typeof:Object,
            default:() => {}
        },
        value:{
            typeof:Object,
            default:() => {}
        }
    },
    methods:{
        searchReset(){
            for( let key in this.value ){ this.value[key] = null };
            this.$emit('input',this.value)
        }
    }
}
</script>
<style lang="less" scoped>
.search{
    padding: 20px; background: #fff;margin-bottom: 10px;border-radius: 6px;
    border: 1px solid #ddd;
    display: flex;align-items:center;
    .search_condition_config{
        display: flex;align-items:center;margin:0 10px;
        .search_label{
            white-space: nowrap;font-size: 12px;
        }
    }
}
    
</style>
