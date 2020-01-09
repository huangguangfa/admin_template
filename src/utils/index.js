import ajax from './ajax'
import router from '../router'
export default {
    /* 注册插件 */
    install(Vue) {
        // /* 路由设置 */
        // router.beforeEach((to, from, next) => {
        //     next()
        // })
        router.afterEach(() => {
            window.scrollTo(0, 0)
        })
        /* 添加过滤器 */
        //   Object.entries (filter).forEach(f => Vue.filter(...f))
        /* 添加UI组件 */
        //   Object.entries(elem).forEach(r => Vue.component(...r))

        /* 添加自定义属性/方法 */
        Object.assign(Vue.prototype, {
            ...ajax,
        })
    }
}