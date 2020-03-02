import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        // 左侧菜单栏数据
        menuItems: [
            // {
            //     icon: 'icon-zidongpaiban1',
            //     url: '/dashboard',
            //     title: '系统首页'
            // },
            {
                icon: 'icon-renyuantiaopei',
                url: '/systemManage/businessManage/product',
                title: '业务相关',
                children:[
                    {
                        url: '/systemManage/businessManage/product',
                        title: '硬件管理',
                    },
                    {
                        url: '/table1',
                        title: '测试表格',
                    },
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