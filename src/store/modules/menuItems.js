export default {
    namespaced: true,
    state: {
        message:0, //全局消息数量
        menuItems:[
            {
                icon: 'icon-renyuantiaopei',
                url: '/systemManage/businessManage/product',
                title: '业务相关',
                children:[
                    {
                        url: '/systemManage/businessManage/product',
                        title: '硬件管理',
                        children:[]
                    },
                    {
                        url: '/table1',
                        title: '测试表格1',
                        children:[]
                    },
                ]
            }
        ]
    },
    mutations: {
        setMenus(state, data) {
            state.menuItems = data
        },
        setMessage(state,data){
            state.message = data
        },
    },
  }