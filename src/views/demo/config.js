
//表格表头参数展示
export const tableOption = Object.freeze([
    {
        prop:'title',
        label:'标题',
        width:200
    },
    {
        prop:'source',
        label:'社区',
        text_over_flow:true,
        width:200
    },
    {
        prop:'publishBegin',
        label:'日期'
    },
    {
        prop:'id',
        label:'ID'
    },
    {
        prop:'state',
        slot_name:'operating_btn',
        label:'操作',
        width:200
    }
]) 

//搜索条件配置
export const searchConfig = Object.freeze([
    {
      slot_name:'add'
    },
    {
      key:'name',
      label:'名字',
      tag:'input'
    },
    {
      key:'selectVal',
      label:'选择状态',
      tag:'select',
      option:[
        { value:'0', label:'下架' },
        { value:'1', label:'上架' }
      ]
    },
    {
        slot_name:'searchBtn'
    }
])