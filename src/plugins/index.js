import Vue from 'vue';
import ElementUI from 'element-ui';

import { paramsCheck } from '@/utils/validate.js';
Vue.prototype.$paramsCheck = paramsCheck;
//提示组件
import Titlehint from '@/components/common/Titlehint/index.vue'
//element
Vue.use(ElementUI, { size: 'mini' });
Vue.prototype.$EventBus = new Vue();
//切换组件方法
import { pageShow } from '@/utils/validate.js';
Vue.prototype.$pageShow = pageShow;

/** 
 *  图片查看器描述
 *  @param {imgData} //传入的key、value是一个对象
 *  @param {*} name //图片名称
 *  @param {*} imgUrl //当前显示的图片 string
 *  @param {*} width //图片width
 *  @param {*} height //图片height
 *  @param {*} multiple //是否有多张 Boolean
 *  @param {*} imgList //多张图片地址 Array
 **/
 import ImageViewer from '@/components/common/imageViewer/src/index.vue';

import UploadFile from '@/components/common/UploadFile/src/index.vue';

 const Components = {
    ImageViewer, //图片查看器
    Titlehint ,//提示组件
    UploadFile, //上传
 }
 Object.keys(Components).forEach((key) => {
    Vue.component(key, Components[key])
 });
 