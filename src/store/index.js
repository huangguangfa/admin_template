import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        // 左侧菜单栏数据
        menuItems: [
            {
                icon: 'el-icon-lx-home',
                index: 'dashboard',
                title: '系统首页'
            },
            {
                icon: 'el-icon-lx-cascades',
                index: 'table1',
                title: '测试表格',
                // children:[
                //     {
                //         icon: 'el-icon-lx-home',
                //         index: 'dashboard',
                //         title: '系统首页',
                //         children:[
                //             {
                //                 icon: 'el-icon-lx-home',
                //                 index: 'dashboard',
                //                 title: '系统首页',
                                
                //             }
                //         ]
                //     }
                // ]
            },
            {
                icon: 'el-icon-lx-home',
                index: 'businessManage',
                title: '业务相关',
                children:[
                    {
                        icon: 'el-icon-lx-home',
                        index: '/systemManage/businessManage/product',
                        title: '硬件管理',
                    }
                ]
            }
        ],
    },
    mutations: {
        setMenus(state, items) {
            state.menuItems = items
        },
    },
    // plugins: [createPersistedState()]  //数据持久化
})

export default store