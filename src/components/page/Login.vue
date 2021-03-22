<template>
    <div class="login-wrap">
        <div class="login-wrap-content">
            <div class="login-title">
                <p>运管办</p>
                <div class="title-img">
                    <img src="@/assets/login/login1.png" alt="">
                    <p>核心业务系统</p>
                    <img src="@/assets/login/login1.png" alt="">
                </div>
            </div>
            <div class="login-screen">
                <!-- 登陆输入 -->
                <div class="login-operation" v-on:keyup.enter="login" >
                    <div>
                        <el-input v-model="param.username" size="medium" placeholder=" 请输入用户名/手机号码" @focus="loginErr = false">
                            <i slot="prefix" class="iconfont icon-yonghu"></i>
                        </el-input>
                    </div>
                    <div>
                        <el-input v-model="param.password" size="medium" show-password placeholder=" 请输入密码" @focus="loginErr = false">
                            <i slot="prefix" class="iconfont icon-mima1"></i>
                        </el-input>
                    </div>
                    <div class="loginErr">
                        <p v-show="loginErr">账号或密码错误！</p>
                    </div>
                    <div>
                        <div class="code">
                            <el-input v-model="param.verification" size="medium" placeholder=" 验证码" @focus="loginErr = false">
                                <i slot="prefix" class="iconfont icon-yanzheng"></i>
                            </el-input>
                        </div>
                        <img @click="iMgOn" :src="codeImg" alt="">
                    </div>
                    <div></div>
                    <div>
                        <el-button 
                            type="primary" round
                            @click="loginStatus === false?login():''"
                            :loading="loginStatus">
                            {{ loginStatus ? ' 登录中...':'登 陆' }}
                        </el-button>
                    </div>  
                </div>
            </div>           
        </div>
        <!-- <userModify ref="userModify"></userModify> -->
    </div>
</template>

<script>
import md5 from 'blueimp-md5';
// import { login,codeRuselu,userInfo,getUserMenu } from './api/index';
import { host } from '@/config';
// import userModify from '@/components/userModify';
export default {
    components:{
        // userModify
    },
    data(){
        return {
            param: {
                username: '',
                password: '',
                verification: null,
            },
            checked:false,
            loginErr:false,
            codeImg:null,
            uuid:null,
            sys:null,
            loginStatus:false,
            u_id:null
        };
    },
    created(){
        if(this.$route.query.sys){
            this.sys = this.$route.query.sys;
        }
        this.iMgOn()
    },
    methods: {
        iMgOn(){
            this.uuid = this.createRandomId();
            this.codeImg =  `${host}/auth/random/getProducer?uuid=${this.uuid}`;
        },
        createRandomId() {
            return (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
        },
        async login(){
            this.$router.push('/dashboard')
            let { username, password } = this.param;
            if(!username || !password){
                return this.$message.error(!username && '请输入账号' || !password && '请输入密码');
            }
            let verification = await codeRuselu(this.param.verification,this.uuid);
            if(!verification.success){
                this.iMgOn()
                return this.$message.error('验证码错误！');
            }
            let param = {
                password:md5(password),
                username:username
            }
            //登陆
            this.loginStatus = true;
            let result = await login(param);
            this.loginStatus = false;
            if( result.success ){
                localStorage.setItem('subway_token',result.sessionId);
                //获取用户信息
                let userInfoData = await userInfo();
                if(!userInfoData.obj.homeMenuList){
                    return this.$message.error('当前用户没有任何权限、不可登陆！');
                }
                //未修改过密码的拦截修改
                if( !userInfoData.obj.passwordFlag ){
                    this.u_id = userInfoData.obj.id;
                    return this.$refs.userModify.status();
                }
                let system_data = {
                    data:{
                        user_info:{
                            user_base_info:{
                                uDepId:userInfoData.obj.depId , //所属组织id
                                companiesId:userInfoData.obj.companiesId , //所属公司ID
                                uId:userInfoData.obj.id,        //用户id
                                uName:userInfoData.obj.name,    //用户名称
                                uPic:userInfoData.obj.pic ,     //用户人脸
                                uType:userInfoData.obj.utype,   //用户类型
                                uRole:userInfoData.obj.roleSet,  //用户角色类型
                                sysConfig:userInfoData.obj.sysParConfigList || [],//系统配置
                                postTypeManagement:userInfoData.obj.postTypeManagement || {}, //所属公司管理的的业务类型
                                userStation:userInfoData.obj.companyByStationInfoList, //所属部门可以管理的"车站"信息
                                userLine:userInfoData.obj.companyByLineList, //所属部门可以管理的"线路"信息
                            },
                            user_menu:userInfoData.obj.homeMenuList
                        },
                    },
                    type:0
                }
            }else{  
                this.loginErr = true;
                this.param.verification = '';
                this.iMgOn();
            }
        },
    },
};
</script>

<style lang="less">
.code{width: 140px;display: flex;align-items: center;}
.loginErr{height: 12px;}
.login-wrap{
    background: url("../../assets/login/login_br.png") no-repeat ;
    background-size:100% 100%;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    .login-title{
        font-size: 28px;
        text-align: center;
        p{
            font-weight: 700;
        }
        .title-img{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 10px;
            margin-bottom: 30px;
            img{
                width: 14px;
                height: 14px;
            }
            p{
                color: #10984F;
                margin: 0 10px;
            }
        }
    }
    .login-screen{
        width: 306px;
        background: #fff;
        padding:25px 52px 30px;
        box-shadow:0px -3px 61px 4px rgba(187,182,182,0.16);
        border-radius:10px;
        .login-logo{
            text-align: center;height: 48px;         
            img{
                width: 160px;
                height: 48px;
            }
        }
        .login-operation{
            display: flex;
            justify-content: center;
            // align-items: center;
            flex-direction: column;
            >div{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 26px;
                font-size: 12px;
                /deep/ .el-input--small .el-input__inner{
                    height: 40px;
                    line-height: 40px;
                    border-radius: 20px;  
                    background:rgba(248,248,250,1);
                    padding-left: 36px;
                }
                img{
                    width: 143px;
                    height: 39px;
                    margin-left: 20px;
                    cursor: pointer;
                }
                i{
                    font-size: 17px;
                    line-height: 40px;
                    margin-left: 8px;
                    // margin-right: 6px;
                }
                p{
                    color: red;
                    margin-left: 20px;
                }
                /deep/ .el-button--small{
                    width: 100%;
                    height: 40px;
                    margin-left: 10px;
                    // box-shadow:0 5px #10984F;
                }
            }
            div:nth-child(3){
                margin-top: 10px;
            }
            div:nth-child(4){
                margin-top: 16px;
            }
        }
    }
    .el-input__inner{
        height: 40px;
        line-height: 40px;
        border-radius: 20px;  
        background:rgba(248,248,250,1);
        padding-left: 36px !important;
        text-indent: 5px;
    }
    .el-button.is-round{
        width: 100%;
        height: 40px;
        margin-left: 10px;
        color: #FFF;
        background-color: #1ca75f;
        border-color: #1ca75f;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .el-input.is-active .el-input__inner, .el-input__inner:focus {
        border-color: #1ca75f;
        outline: 0;
    }
}

</style>