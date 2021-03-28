<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="header-left">
            <div class="logo" @click="collapseChage">
                <img src="@/assets/logo.png" alt="logo">
                <span>深圳地铁</span>
            </div>

            <ul class="title_Module">
                <li v-for="(i,index) in titleModuleList" @click="switchSystem(i,index,600)"
                    :key="index" :class="index === current_system_index?'title_selected':''">
                    <i class="iconfont" :class="i.icon"></i>
                    <span>{{i.name}}</span>
                </li>
                <div id="bottom_border" ref="bottom_border" class="title_Module_bottom_border" :style="`left:${title_border_left}px`" ></div>
            </ul>
        </div>
        
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip
                        effect="dark"
                        :content="message?`有${message}条未读消息`:`消息中心`"
                        placement="bottom"
                    >
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="../../assets/img/img.jpg" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            collapse: false,
            fullscreen: false,
            name: 'linxin',
            activeName:'second',
            message: 2,
            titleModuleList:[
                {
                    name:'控制台的',
                    icon:'icon-kongzhitai'
                },
                {
                    name:'综合执法',
                    icon:'icon-zonghezhifa1'
                },
                {
                    name:'智能考勤',
                    icon:'icon-kaoqin3'
                },
                {
                    name:'三项业务',
                    icon:'icon-yewu1'
                },
                {
                    name:'设备管理',
                    icon:'icon-shebeiguanli1'
                },
                {
                    name:'综合管理',
                    icon:'icon-tubiao-'
                },
                {
                    name:'系统管理',
                    icon:'icon-system'
                }
            ],
            current_system_index:0,
            title_border_left:0,
            border_width:125,
        };
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    mounted(){
        //监听屏幕变化设置title的长度
        this.getSystemClientWidth();
        window.addEventListener('resize', () =>{
            this.getSystemClientWidth();
        })
    },
    methods: {
        getSystemClientWidth(){
            if( !this.$refs.bottom_border ) return;
            this.border_width = this.$refs.bottom_border.clientWidth || 125;
            this.title_border_left = this.current_system_index * this.border_width;
        },
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username');
                this.$router.push('/login');
            }
        },
        //切换应用系统
        switchSystem( sys, index ){
            this.title_border_left = index * this.border_width;
            this.current_system_index = index;
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            this.$EventBus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style lang="less" scoped>
.header-left{display: flex;}
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 54px;
    font-size: 22px;
    color: #343435;
    background: #fff;
    box-shadow: 0 5px 10px #ddd;
    display: flex; justify-content: space-between;
    overflow: hidden;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    display: flex; align-items: center;
    line-height: 70px;cursor: pointer;
    margin-left:12px;width:175px;
    span{color: #343435;font-weight: 700;font-size: 20px;}
    img{margin-right: 6px;width: 35px;height: auto;}
}
.header-right {
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 54px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #343435;
}
.btn-bell .el-icon-bell {
    color: #343435;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #343435;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
.title_Module{
    display: flex; position: relative;
    user-select: none; justify-content: center;
    li{
        height: 55px; display: flex;align-items: center; width: 120px;
        cursor: pointer; justify-content: space-between; padding: 0 17px; box-sizing: border-box;
        font-size: 15px;color: #030202;
        .iconfont{ font-size: 18px;}
    }
    .title_selected{
        color: #2E81FC; box-sizing: border-box;
        transition: all 0.5s ; 
        font-weight: 700; align-items: center; position: relative;
        span{font-weight: 700; font-size: 15px;}
    }
    .title_Module_bottom_border{
        width: 120px;height: 2px;
        transition: all 0.5s; 
        position: absolute;
        bottom: 0px;
    } 
    .title_Module_bottom_border::after{
        content: "";
        width: 85px;
        margin: 0 auto;
        height: 2px;
        background:#2E81FC ;
        position: absolute;left:20px;
    }
}
</style>
