<template>
    <div class="upload" :class="isDropAims === true && isDrag?'Drop':''" ref="upload">
        <input type="file" :accept="fileType" class="upload-file" @change="handleFileChange" ref="inputer">
        <div class="remind" 
            ref="input_substitute"
            @drop.prevent="onDrop"
            @dragover.prevent="isDropAims = true;"
            @dragleave.prevent="isDropAims = false"
            @click="handleInputClick" >
            <slot>
                <div class="remind_c">
                    <i class="iconfont icon-shangchuan2"></i>
                    <span>{{isDrag === true?'将文件拖到此处，或点击上传':'点击上传'}}</span>
                </div>
            </slot>
        </div>
        <div class="circle" v-show="logding">
            <div class="circle_c">
                <Circleview :width="circleWidth" :percentage="percentage"></Circleview>
            </div>
        </div>
    </div>
</template>

<script>
import { uploadFiles } from './api/index';
import Circleview from '../../circle/src/index';
export default {
    name:'UploadFile',
    props:{
        //上传文件类型
        fileType:{
            type:String,
            default:'image/png,image/jpg,image/jpeg'
        },
        //上传路径
        url:{
            type:String,
            default:'/oss/oss/storageObject'
        },
        //是否自动上传
        autoUpload:{
            type:Boolean,
            default:true
        },
        //是否支持拖拽
        isDrag:{
            type:Boolean,
            default:false
        },
        //上传文件字段名
        name:{
            type:String,
            default:'object'
        },
        //文件大小
        size:{
            type:Number,
            default:1000000
        },
        //是否需要压缩
        isCssions:{
            type:Boolean,
            default:false
        },
        //是否拦截
        isIntercept:{
            type:Boolean,
            default:false
        }
    },
    components:{
        Circleview
    },  
    data(){
        return{
            $_inputDOM:null,
            //是否拖拽到上传位置
            isDropAims:false,
            //loading
            logding:false,
            //上传进度
            percentage:10,
            $_input_substitute:null,
            circleWidth:80
        }   
    },
    mounted(){
        this.$_inputDOM = this.$refs.inputer;
        this.$_input_substitute = this.$refs.input_substitute;
        let offsetWidth = this.$refs.upload.offsetWidth;
        let offsetHeight = this.$refs.upload.offsetHeight;
        this.circleWidth = (offsetWidth > offsetHeight ? offsetHeight:offsetWidth) - 20;
    },
    methods: {
        //替身input事件
        handleInputClick(){
            !this.isIntercept && this.$refs.inputer.click();
            this.isIntercept && this.interceptNotice()
        },
        //拦截通知
        interceptNotice(){
            this.$emit('interceptPreview',true)
        },
        //input 事件
        async handleFileChange(ev){
            let file = this.isCssions &&  await this.compressions(this.$_inputDOM.files[0]) || this.$_inputDOM.files[0];
            let size = Math.floor(file.size / 1024);
            // if (file.type.indexOf('image') === -1) {return this.$message.error('请选择图片文件')};
            // 1TB等于1024GB；1GB等于1024MB；1MB等于1024KB；1KB等于1024Byte(字节);
            if (size > this.size) { return this.$message.error(`文件大小不能超过${this.size}k`);}
            this.$emit('preview',file);
            this.autoUpload === true && this.upload(file);
        },
        //单图上传
        async upload(file){
            this.logding = true;
            let fileformData = this.getFileParam(file);
            try {
                let result = await uploadFiles(this.url,fileformData,this.progress);
                this.autoUpload === true && this.$emit('Success',result.obsPath);
                this.autoUpload === false && this.$emit('Success',result);
            } catch (err) {
                this.$emit('Error',err)
            }
            this.$_inputDOM.value = null;
            this.logding = false;
        },
        //多图上传
        moreUpload(flieList){
            let isArr = flieList instanceof Array;
            if(isArr === true && flieList.length != 0){
                //组装上传参数array
                let fileformList = flieList.map( item =>{
                    return this.getFileParam(item)
                })
                //组装上传方法array
                let fileUploadFnList = fileformList.map( item =>{
                   return uploadFiles(this.url,item,this.progress);
                })
                //发送多张上传
                Promise.all(fileUploadFnList).then( (result) => {
                    this.$emit('Success',result);
                }).catch((error) => {
                    this.$emit('Error',err)
                })
            }else{
                this.$emit('Error','多图上传至少要保证有一个文件和上传参数为Array');
            }
        },
        //组装上传参数
        getFileParam(file){
            // 上传文件字段名称
            let uploadName = this.name;
            let formData = new FormData(); 
            formData.append(uploadName,file);
            return formData;
        },
        //压缩操作
        compressions(file){
            const name = file.name; //文件名
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise( (resolve,reject) =>{
                reader.onload = e => {
                    const src = e.target.result;
                    const img = new Image();
                    img.src = src;
                    img.onload = e => {
                        const w = img.width;
                        const h = img.height;
                        const quality = 0.8;  // 默认图片质量为0.92
                        // 生成canvas
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        // 创建属性节点
                        const anw = document.createAttribute("width");
                        anw.nodeValue = w;
                        const anh = document.createAttribute("height");
                        anh.nodeValue = h;
                        canvas.setAttributeNode(anw);
                        canvas.setAttributeNode(anh);

                        // 铺底色 PNG转JPEG时透明区域会变黑色
                        ctx.fillStyle = "#fff";
                        ctx.fillRect(0, 0, w, h);

                        ctx.drawImage(img, 0, 0, w, h);
                        // quality值越小，所绘制出的图像越模糊
                        const base64 = canvas.toDataURL('image/jpeg', quality); // 图片格式jpeg或webp可以选0-1质量区间
                        // 返回base64转blob的值
                        console.log(`原图${(src.length/1024).toFixed(2)}kb`, `新图${(base64.length/1024).toFixed(2)}kb`);
                        // 去掉url的头，并转换为byte
                        const bytes = window.atob(base64.split(',')[1]);
                        // 处理异常,将ascii码小于0的转换为大于0
                        const ab = new ArrayBuffer(bytes.length);
                        const ia = new Uint8Array(ab);
                        for (let i = 0; i < bytes.length; i++) {
                            ia[i] = bytes.charCodeAt(i);
                        }
                        file = new Blob([ab], {type : 'image/jpeg'});
                        file.name = name;
                        resolve(file)
                        // success(file);
                    }
                    img.onerror = e => {
                        reject(e)
                    }
                }
            })
            reader.onerror = e => {
                this.$emit('Error',e);
            }
        },
        //上传进度
        progress(progress){
            let loaded = Number(progress.loaded);
            let total = Number(progress.total);
            this.percentage = Math.round((loaded/total) * 100);
        },
        //拖拽放下事件
        onDrop(e){
            if(this.isDrag === false){
                return false
            }
            //清除默认事件
            e.preventDefault();
            let fileList = e.dataTransfer.files; // 文件对象列表
            // 必须要有一个文件
            if (fileList.length === 0) {return this.$emit('Error','上传必须有一个文件')};
            //格式限制
            if (fileList[0].type.indexOf('image') === -1) {return this.$message.error('请选择图片文件')};
            // 限制下只能拖一个文件
            if (fileList.length > 1) {return this.$message.error('暂时不支持多文件')};
            this.isDropAims = false;
            this.$emit('preview',fileList);
            this.autoUpload === this.upload(fileList[0]);
        },
    },
}
</script>
<style scoped lang="less">
    .upload{
        width: 100%; height: 100%;border:1px solid rgba(205, 215, 223, 1);cursor: pointer;overflow: hidden; position: relative;box-sizing: border-box; 
        border-radius: 5px;
        background:rgba(246,247,248,1);
        &:hover{border-color: #6BA9DC;}
        // z-index: 6;
        .upload-file{width: 100%; height: 100%; opacity: 0;cursor: pointer; position: relative; font-size:0; top:0; display: none;}
        .circle{width: 100%; height: 100%; position: absolute; left: 0; top: 0; display: flex; z-index: 10;
         align-items: center; justify-content: center; background: #fff;
            .circle_c{width: 80%; height: 80%; display: flex; justify-content: center; align-items: center;}
         }
        .remind{
            width: 100%; height: 100%; position: absolute; left: 0; top: 0; display: flex; align-items: center; justify-content: center;
        }
    }
    .Drop{border: 3px dashed #6BA9DC; background:rgba(107,169,220,0.1);}
    .remind_c{
        .icon-shangchuan2{color: #6BA9DC; font-size: 70px;width: 100%;display: flex; justify-content: center;}
        span{color:rgba(107,169,221,1); text-align: center; display: block; font-size: 12px;}
    }
</style>