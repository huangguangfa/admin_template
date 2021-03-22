export default [
    {
        path: '/demo',
        component: () => import( '@/views/demo/index'),
        meta: { title: '硬件管理' }
    },
]