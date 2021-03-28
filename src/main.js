import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './style/css/theme-green/index.css'; // 浅绿色主题
import './style/css/icon.css';
import 'babel-polyfill';
import './utils/rem';
import './plugins'
Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');