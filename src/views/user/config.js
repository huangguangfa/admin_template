
//表格表头参数展示
export const tableOption = Object.freeze([
    { prop:'title', label:'姓名'},
    { prop:'source', label:'手机号', text_over_flow:true },
    { prop:'publishBegin',  label:'申请时间' },
    { prop:'id',text_over_flow:true, label:'开户地址' },
    { prop:'id', label:'审核时间' },
    { prop:'id', label:'审核员' },
    {
        prop:'state',
        slot_name:'operating_btn',
        label:'操作',
        width:200
    }
]) 

//搜索条件配置
export const searchConfig = Object.freeze([
    { slot_name:'add' },
    {
      key:'name',
      label:'姓名',
      tag:'input'
    },
    {
      key:'phone',
      label:'电话',
      tag:'input'
    },
    {
        key:'date',
        label:'申请日期',
        tag:'date'
    },
    { slot_name:'searchBtn' }
])


//开户类型
export const account_type_list = [
  { label:'代理人',  value:'0' },
  { label:'业主本人',  value:'1' },
]
//安装类型列表
export const install_type_list = [
  { label:'装表',  value:'0' },
  { label:'装气',  value:'1' },
]
//业主证件类型
export const certificate_tyoe_list = [
  { label:'身份证',  value:'0' },
  { label:'房产证',  value:'1' },
]
//产权证明列表
export const proof_property_list = [
  { label:'购房合同',  value:'0' },
  { label:'房产证',  value:'1' },
]