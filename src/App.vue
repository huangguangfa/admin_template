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
        background-size: 10px 8px;
        width: 10px;
        height: 8px;
        top:50%;
        margin-top: -3px;
        left: 60px;
    }

//页面数据编辑样式
.handle_table_data{
    .handle_table_data_box{
        padding: 20px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 6px;
        position: relative;
        .submit_btn{ position: absolute;right: 20px;top: 15px;}
        .handle_table_data_title{
            position: relative; margin-bottom: 20px; height: 20px;
            font-size: 14px;
            &::before{
                position: absolute;
                content: "";
                background: #51c782;
                width: 5px;
                height: 5px;
                border-radius: 100%;
                left: -10px;
                top: 50%;
                margin-top: -5px;
            }
        }
        .handle_table_data_content{
            border: 1px solid #cdd7df;
            .tablelist{
                width: 100%;
                tr{
                    border-bottom: 1px solid #cdd7df;width: 100%;
                    td{  height: 0; vertical-align: middle; word-wrap:break-word;
    word-break:break-all;  }
                    .h_row_item_label{
                        font-size: 12px;
                        width: 100px;
                        background: #f6fafa;
                        line-height: 23px;
                        text-align: center;
                        height: 47px !important;
                        word-break:hyphenate;
                        border-right: 1px solid #cdd7df;
                    }
                    .necessary{
                        position: relative;
                        &::after{
                            content: '*';
                            position: absolute;
                            left: 15px;
                            color: red;
                        }
                    }
                    .necessary_top{
                        position: relative;
                        &::after{
                            content: '*';
                            position: absolute;
                            left: 0px;
                            top: 0px;
                            color: red;
                        }
                    }
                    .h_row_item_value{
                        .h_row_item_value_box{
                            height: 100%; display: flex; align-items: center;
                            /deep/ .el-input--mini .el-input__inner{ height: 100% !important;border: none !important; }
                            /deep/ .el-input{ height: 100% !important; border-right: 1px solid #cdd7df !important; width: 300px !important; }
                            /deep/ .el-select { height: 100% !important; }
                        }
                    }
                    td:last-child{
                        .h_row_item_value_box{
                            /deep/ .el-input{ border-right:none; }
                        }
                    }
                    .no_style{
                        width: 0;background: none;border-right:none;padding: none !important;
                    }
                }
                tr:last-child{
                    border: none;
                }   
            }
        }
    }
}
.upload_box{
    width: 201px;height: 140px;background: #F6F7F8;border-radius: 5px;
    .upload_slot{
        display: flex;justify-content: center;align-items: center;align-content: flex-start; flex-wrap: wrap;
        .upload-card {
            width: 140px;
            font-size: 12px;
            text-align: center;
            > p:nth-child(1) {
                padding: 9px 10px;
                color: #fff;
                background-color: #0078ff;
                border-radius: 3px;
            }
            > p:nth-child(2) {
                margin-top: 10px;
                color: #ccc;
            }
        }
        .upload_text{
            width: 100%;
            font-size: 12px;
            font-weight: 400;
            color: #AAAAAA;
            text-align: center;margin-top: 10px;
        }
    }
}
.preview_img{
    width: 201px;
    height: 140px;
    border-radius: 5px;border: 1px solid #cdd7df;
    position: relative;
    .del_img{
        width: 201px;
        height: 30px;
        background: #000000;
        opacity: 0.59;
        border-radius: 0px 0px 5px 5px;
        position: absolute;
        bottom: 0;left: 0;
        z-index: 9999;
        color: #fff;
        font-size: 12px;
        display: none;
    }
    &:hover .del_img{display: block; display: flex;justify-content: center;align-items: center;cursor: pointer;}
}
.necessary{
    position: relative;
    &::after{
        content: '*';
        position: absolute;
        left: 15px;
        color: red;
    }
}

</style>