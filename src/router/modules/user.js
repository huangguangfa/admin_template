export default [
    {
        path: '/user',
        component: () => import( '@/views/user'),
        meta: { title: '用户管理' }
    },
]