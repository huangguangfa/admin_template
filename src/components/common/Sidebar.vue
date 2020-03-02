<template>
    <div class="sidebar">
         <!-- background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff" -->
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            unique-opened
            router>
            <template v-for="item in items">
                <!-- 多级 -->
                <template v-if="item.children">
                    <el-submenu :index="item.url" :key="item.url">
                        <template slot="title">
                            <i :class="item.icon" class="iconfont"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        
                        <template v-for="subItem in item.children">
                            <el-submenu
                                v-if="subItem.children"
                                :index="subItem.url"
                                :key="subItem.url"
                            >
                                <template slot="title">
                                    <i :class="isubItem.icon" class="iconfont"></i>
                                    <span slot="title">{{ isubItem.title }}</span>
                                </template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.children"
                                    :key="i"
                                    :index="threeItem.url"
                                >
                                    <i :class="threeItem.icon" class="iconfont"></i>
                                    <span slot="title">{{ threeItem.title }}</span>
                                </el-menu-item>
                            </el-submenu>

                            <el-menu-item
                                v-else
                                :index="subItem.url"
                                :key="subItem.url"
                            >
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
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items:this.$store.state.menuItems
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.iconfont{margin-right: 10px;}
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 55.5px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 183px; overflow: hidden;
}
.sidebar > ul {
    height: 100%;
}
</style>
