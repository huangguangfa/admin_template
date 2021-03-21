<template>
    <div class="sidebar">
        <el-menu
            v-if="!isFirstStatus"
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="isCollapse"
            unique-opened
            router>
            <template v-for="item in $store.getters.menuItems">
                <!-- 多级 -->
                <template v-if="item.children.length">
                    <el-submenu :index="item.url" :key="item.url">
                        <template slot="title">
                            <i :class="item.icon" class="iconfont"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
    
                        <template v-for="subItem in item.children">
                            <el-submenu
                                v-if="subItem.children.length"
                                :index="subItem.url"
                                :key="subItem.url">
                                <template slot="title">
                                    <i :class="isubItem.icon" class="iconfont"></i>
                                    <span slot="title">{{ isubItem.title }}</span>
                                </template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.children"
                                    :key="i"
                                    :index="threeItem.url">
                                    <i :class="threeItem.icon" class="iconfont"></i>
                                    <span slot="title">{{ threeItem.title }}</span>
                                </el-menu-item>
                            </el-submenu>

                            <el-menu-item
                                v-else
                                :index="subItem.url"
                                :key="subItem.url">
                                <i :class="subItem.icon" class="iconfont"></i>
                                <span slot="title">{{ subItem.title }}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <!-- 只有一级 -->
                <template v-else>
                    <el-menu-item :index="item.url" :key="item.url">
                        <i :class="item.icon" class="iconfont"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
        <!-- <img v-else class="Sidebar_img" src="@/assets/img/Sidebar.png" alt=""> -->
    </div>
</template>

<script>
import bus from './bus'
export default {
    data() {
        return {
            isCollapse: false,
            isFirstStatus:false
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('', '');
        }
    },
    watch:{
        "$store.getters.menuItems"() {
            this.isFirstStatus = false;
        }
    },
    created() {
        bus.$on('collapse', value => {
            this.$parent.isCollapse = value;
            this.isCollapse = value;
        });
    }
};
</script>

<style scoped>
.iconfont{margin-right: 21px; font-size: 18px;}
.sidebar {
    width: 100%;
    display: block;
    height: 90vh;
    overflow-y: scroll;
    padding-bottom: 40px;
    position: absolute;
    left: 0;
    top: 56px;
    user-select:none;
}
.sidebar::-webkit-scrollbar { width: 0px;}
.sidebar-el-menu:not(.el-menu--collapse) {  width: 200px;  min-height: 400px;}
.sidebar > ul { height: 100%;}

</style>

<style lang="less">
    .is-opened{
        .el-submenu__title{color: #030202; background:rgba(244,244,244,1);
            >.iconfont{color: #030202;}
        }
    }
    .sidebar{
        .el-submenu__title{ position: sticky; top: 0;  z-index: 99; }
        .Sidebar_img{
            width:146px;height: 700px;transform: scale(0.9);
            position: absolute;left: 30px;z-index: 999;top: 10px;
        }
    } 
</style>
