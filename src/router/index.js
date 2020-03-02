import Vue from 'vue';
import Router from 'vue-router';

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
                    path: '/systemManage/businessManage/product',
                    component: () => import( '@/views/systemManage/businessManage/product/index'),
                    meta: { title: '硬件管理' }
                },
                {
                    path: '/dashboard',
                    component: () => import( '@/components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/table1',
                    component: () => import('../components/page/title/Table.vue'),
                    meta: { title: '基础表格' }
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