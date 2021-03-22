import Vue from 'vue';
import Router from 'vue-router';
import RouterConfig from './modules' // 引入业务逻辑模块
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/systemManage/businessManage/product'
        },
        {
            path: '/',
            component: () => import('../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import( '@/components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/404',
                    component: () => import('../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import('../components/page/403.vue'),
                    meta: { title: '403' }
                },
                ...RouterConfig
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});