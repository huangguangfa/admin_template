<!-- 测试数据 修改 展示 -->
<template>
    <div class='dataStatusPage'>
        <el-dialog
            title="提示"
            width="757px"
            :visible.sync="dialogVisible"
            :before-close="handleClose">
            <ul class="parmas">
                <div class="parmas_li">
                    <li>
                        <span>用户名</span>
                        <div class="elInput">
                            <el-input v-model="childrenData.name" placeholder="请输入用户名"></el-input>
                        </div>
                    </li>
                    <li>
                        <span>性别</span>
                        <div class="elInput">
                            <el-input v-model="childrenData.name" placeholder="请输入性别"></el-input>
                        </div>
                    </li>
                </div>
                
               <div class="parmas_li">
                    <li>
                        <span>密码</span>
                        <div class="elInput">
                            <el-input v-model="childrenData.money" placeholder="请输入密码"></el-input>
                        </div>
                    </li>
                    <li>
                        <span>确认密码</span>
                        <div class="elInput">
                            <el-input v-model="childrenData.money" placeholder="请输入密码"></el-input>
                        </div>
                    </li>
               </div>
               <div class="parmas_li">
                   <li>
                        <span>备注</span>
                        <div class="elInput">
                            <el-input v-model="childrenData.thumb" placeholder="请输入备注信息"></el-input>
                        </div>
                    </li>
                    <li>
                        <span>申请理由</span>
                        <div class="elInput">
                            <el-input v-model="childrenData.date" placeholder="请输入密码"></el-input>
                        </div>
                    </li>
               </div>
               <div class="parmas_li">

               </div>
               <div class="parmas_li">
                   <li>
                        <span>地址信息</span>
                        <div class="elInput">
                            <el-input v-model="childrenData.address" placeholder="请输入密码"></el-input>
                        </div>
                    </li>
                    <li>
                        <span>金额</span>
                        <div class="elInput">
                            <el-input v-model="childrenData.id" placeholder="请输入密码"></el-input>
                        </div>
                    </li>
               </div>
               <div class="parmas_li">
                    <li>
                        <span>时间</span>
                        <div class="elInput">
                            <el-input v-model="childrenData.date" placeholder="请输入密码"></el-input>
                        </div>
                    </li>
                    <li>
                        <span>时间</span>
                        <div class="elInput">
                            <el-input v-model="childrenData.date" placeholder="请输入密码"></el-input>
                        </div>
                    </li>
               </div>
                
                <div class="parmas_li">
                     <li>
                        <span>入户时间</span>
                        <div class="elInput">
                            <el-input v-model="childrenData.date" placeholder="请输入密码"></el-input>
                        </div>
                    </li>
                    <li>
                        <span>创建时间</span>
                        <div class="elInput">
                            <el-input v-model="childrenData.date" placeholder="请输入密码"></el-input>
                        </div>
                    </li>
                </div>
                <div class="parmas_li">
                    <li>
                        <span>测试地址</span>
                        <div class="elInput">
                            <el-input v-model="childrenData.address" placeholder="请输入密码"></el-input>
                        </div>
                    </li>
                    <li>
                        <span>接口创建</span>
                        <div class="elInput">
                            <el-input  v-model="childrenData.thumb" placeholder="请输入密码"></el-input>
                        </div>
                    </li>
                </div>
            </ul>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

export default {
    props:{
        childrenData:Object
    },
    components: {},
    data() {
        return {
            dialogVisible: false
        };
    },
    mounted() {

    },
    created() {

    },
    methods: {
        handleClose(done) {
            this.$parent.dataShow = false;
            done();
        },
        submit(){
            console.log(this.childrenData)
        }
    },
}
</script>
<style lang='less' scoped>
    .parmas{
        // display: flex; flex-wrap: wrap;
        .parmas_li{
            width: 100%;
            display: flex; justify-content: space-between;
            li{ display: flex; align-items: center;
                margin: 8px 0;
                span{white-space: nowrap; margin-right: 14px; display: inline-block;text-align: right; width: 60px; }
                .elInput{width: 263px;}
            }
        }
        
    }
</style>