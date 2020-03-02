import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import store from './store/index';
// import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './style/css/theme-green/index.css'; // 浅绿色主题
import './style/css/icon.css';
import 'babel-polyfill';
import './utils/rem'
//提示组件
import Titlehint from './components/common/Titlehint/index.vue'
Vue.component('Titlehint',Titlehint)
Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');