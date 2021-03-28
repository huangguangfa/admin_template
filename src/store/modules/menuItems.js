export default {
    namespaced: true,
    state: {
        message:0, //全局消息数量
        menuItems:[
            // {
            //     icon: 'icon-ditu',
            //     url: '/demo',
            //     title: '业务相关',
            //     children:[
            //         {
            //             url: '/demo',
            //             icon: 'icon-renlianshibie2',
            //             title: '硬件管理',
            //             children:[]
            //         }
            //     ]
            // },
            
            //用户管理
            {
                icon: 'ranqi_icondh01',
                url: '/user',
                title: '燃气开户',
                children:[
                    {
                        url: '/user',
                        title: '用户管理',
                        children:[]
                    }
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