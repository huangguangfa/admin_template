<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style lang="less" src="./style/base/reaet.less"></style> 
<style  src="./style/commonCss/index.css"></style> 
<style lang="less">
    @import "./style/css/main.css";
    @import "./style/commonCss/page.less";
    /*深色主题*/
    /* @import "./style/css/color-dark.css";    */
    /* 浅绿色主题   */
    @import "./style/css/theme-green/color-green.css";
    /* 弹出框上下居中 */
    .el-dialog{
       display: flex;
       flex-direction: column;
       margin:0 !important;
       position:absolute;
       top:50%;
       left:50%;
       transform:translate(-50%,-50%);
       /* height:600px; */
       max-height:calc(100% - 30px);
       max-width:calc(100% - 30px);
       .el-dialog__header{background: #f1f1f1;padding: 10px 30px;
            .el-dialog__headerbtn{
                top: 13px;
                .el-icon-close{color: #606266;}
            }
       }
       .dialog__footer {
           padding: 10px 12px 20px;
       }
   }
    .el-dialog .el-dialog__body{
        padding: 15px 20px;
        flex:1;
        overflow: auto;
    }
    .el-dialog__title{color: #606266 !important; font-size: 16px !important; position: relative; font-weight: 600;}
    .el-dialog__title::after{
        content:"";
        width: 3px;
        height: 16px;
        background: #909399;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 5px;
        position: absolute;
        left: -10px; top: 3px;
    }
    .el-menu-item.is-active{ position: relative;}
    .el-menu-item.is-active::before{
        position: absolute;
        display: block;
        content: '';
        background-image: url('./assets/is-active.png');
        background-size: 15px 13px;
        width: 15px;
        height: 13px;
        top:50%;
        margin-top: -6px;
        left: 30px;
    }
</style>