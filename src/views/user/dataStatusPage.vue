<template>
    <div class="handle_table_data">
        <Titlehint  :list="[getOperating]" :show="true" :isData="{ activeName:'tableModule' }"> </Titlehint>
        <div class="handle_table_data_box">
            <div class="submit_btn">
                <el-button type="primary" icon="iconfont ranqi_icondh20">  提交 </el-button>
            </div>
            <!-- 开户基本信息 -->
            <div class="handle_table_data_title"> 开户基本信息 </div>
            <div class="handle_table_data_content">
                <table class="tablelist">
                    <tr>
                        <td class="h_row_item_label necessary"> 业主姓名 </td>
                        <td class="h_row_item_value">
                            <div class="h_row_item_value_box"> <el-input v-model="params.user_name" placeholder="输入业主姓名"></el-input> </div>
                        </td>
                        <td class="h_row_item_label necessary"> 手机号 </td>
                        <td class="h_row_item_value">
                            <div class="h_row_item_value_box"> <el-input type="number" v-model="params.phone" placeholder="输入业主手机号"></el-input>  </div>
                        </td>
                        <td class="h_row_item_label necessary"> 开户类型 </td>
                        <td class="h_row_item_value">
                            <div class="h_row_item_value_box">
                                <el-select v-model="params.account_type" placeholder="请选择">
                                    <el-option
                                        v-for="item in account_type_list" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td class="h_row_item_label necessary"> 业主地址 </td>
                        <td class="h_row_item_value">
                            <div class="h_row_item_value_box"> <el-input v-model="params.address" placeholder="输入业主地址"></el-input>  </div>
                        </td>
                        <td class="h_row_item_label no_style">  </td>
                        <td class="h_row_item_value" >
                            <div class="h_row_item_value_box" > <el-input v-model="params.address" placeholder="选择或者输入小区名称"></el-input> </div>
                        </td>
                        <td class="h_row_item_label no_style">  </td>
                        <td class="h_row_item_value" >
                            <div class="h_row_item_value_box" >  <el-input v-model="params.address" placeholder="请输入详细地址，如：“1单元1001”"></el-input> </div>
                        </td>
                    </tr>

                    <tr>
                        <td class="h_row_item_label necessary"> 安装类型 </td>
                        <td class="h_row_item_value">
                            <div class="h_row_item_value_box">
                                <el-select v-model="params.install_type" placeholder="请选择安装类型">
                                    <el-option v-for="item in install_type_list" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </div>
                        </td>
                        <td class="h_row_item_label necessary"> 预约时间 </td>
                        <td class="h_row_item_value">
                            <div class="h_row_item_value_box">  <el-date-picker v-model="params.reservation_date" type="date" placeholder="选择预约日期"> </el-date-picker> </div>
                        </td>
                    </tr>
                </table>
            </div>
            <!-- 代理人资料 -->
            <div class="handle_table_data_title mt20"> 代理人资料 </div>
            <div class="handle_table_data_content">
                <table class="tablelist">
                    <tr>
                        <td class="h_row_item_label necessary"> 代理人姓名 </td>
                        <td class="h_row_item_value">
                            <div class="h_row_item_value_box"> <el-input v-model="params.proxy_user_name" placeholder="输入代理人姓名"></el-input> </div>
                        </td>
                        <td class="h_row_item_label necessary"> 手机号 </td>
                        <td class="h_row_item_value">
                            <div class="h_row_item_value_box"> <el-input type="number" v-model="params.proxy_phone" placeholder="输入代理人手机号"></el-input>  </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="h_row_item_label necessary"> 上传 </td>
                        <td class="h_row_item_value " style="padding:10px;">
                            <div class="flex2">
                                <!-- 身份证正面 -->
                                <div class="preview_img" v-if="params.proxy_identity_z">
                                    <imageViewer :imgUrl="params.proxy_identity_z"></imageViewer>
                                    <div class="del_img" @click="delImgFn('proxy_identity_z')">
                                        <i class="iconfont ranqi_iconshanchu2"></i>
                                        删除
                                    </div>
                                </div>
                                <div class="upload_box ml5" v-else>
                                    <UploadFile @success="uploadFile('proxy_identity_z',$event)">
                                        <div class="upload_slot">
                                            <div class="upload-card"> <p>点击上传</p></div>
                                            <div class="upload_text">上传身份证正面</div>
                                        </div>
                                    </UploadFile>
                                </div>
                                <!-- 身份证反面面 -->
                                <div class="preview_img ml5" v-if="params.proxy_identity_f">
                                    <imageViewer :imgUrl="params.proxy_identity_f"></imageViewer>
                                    <div class="del_img" @click="delImgFn('proxy_identity_f')">
                                        <i class="iconfont ranqi_iconshanchu2"></i>
                                        删除
                                    </div>
                                </div>
                                <div class="upload_box ml5" v-else>
                                    <UploadFile @success="uploadFile('proxy_identity_f',$event)">
                                        <div class="upload_slot">
                                            <div class="upload-card"> <p>点击上传</p></div>
                                            <div class="upload_text">上传身份证反面</div>
                                        </div>
                                    </UploadFile>
                                </div>
                                <!-- 委托书 -->
                                <div class="preview_img ml5" v-if="params.proxy_entrust_url">
                                    <imageViewer :imgUrl="params.proxy_entrust_url"></imageViewer>
                                    <div class="del_img" @click="delImgFn('proxy_entrust_url')">
                                        <i class="iconfont ranqi_iconshanchu2"></i>
                                        删除
                                    </div>
                                </div>
                                <div class="upload_box ml5" v-else>
                                    <UploadFile @success="uploadFile('proxy_entrust_url',$event)">
                                        <div class="upload_slot">
                                            <div class="upload-card"> <p>点击上传</p></div>
                                            <div class="upload_text">上传委托书</div>
                                        </div>
                                    </UploadFile>
                                </div>
                                <!-- 手持委托书 -->
                                <div class="preview_img ml5" v-if="params.proxy_entrust_hold_url">
                                    <imageViewer :imgUrl="params.proxy_entrust_hold_url"></imageViewer>
                                    <div class="del_img" @click="delImgFn('proxy_entrust_hold_url')">
                                        <i class="iconfont ranqi_iconshanchu2"></i>
                                        删除
                                    </div>
                                </div>
                                <div class="upload_box ml5" v-else>
                                    <UploadFile @success="uploadFile('proxy_entrust_hold_url',$event)">
                                        <div class="upload_slot">
                                            <div class="upload-card"> <p>点击上传</p></div>
                                            <div class="upload_text">上传手持委托书</div>
                                        </div>
                                    </UploadFile>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <!-- 代理人资料 -->
            <div class="handle_table_data_title mt20"> 业主证明身份资料 </div>
            <div class="flex">
                <div class="handle_table_data_content w_50">
                    <table class="tablelist">
                        <tr>
                            <td class="h_row_item_label necessary"> 证件类型 </td>
                            <td class="h_row_item_value">
                                <div class="h_row_item_value_box"> 
                                    <el-select v-model="params.certificate_tyoe" placeholder="请选择证件类型">
                                        <el-option v-for="item in certificate_tyoe_list" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                    </el-select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="h_row_item_label necessary"> 身份证号 </td>
                            <td class="h_row_item_value">
                                <div class="h_row_item_value_box"> <el-input type="number" v-model="params.owner_identity_num" placeholder="输入业主身份证号"></el-input> </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="h_row_item_label necessary"> 业主姓名 </td>
                            <td class="h_row_item_value">
                                <div class="h_row_item_value_box"> <el-input v-model="params.owner_user_name" placeholder="输入业主姓名"></el-input> </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="h_row_item_label necessary"> 有效日期 </td>
                            <td class="h_row_item_value">
                                <div class="h_row_item_value_box"> <el-date-picker v-model="params.owner_identity_date" type="date" placeholder="身份证有效日期"></el-date-picker> </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="handle_table_data_content w_50 no_l_border">
                    <table class="tablelist h_100 ">
                        <tr class="h_100">
                            <td class="h_row_item_label necessary h_100"> 上传 </td>
                            <td class="h_row_item_value " style="padding:10px;">
                                <div class="flex2">
                                    <div class="preview_img" v-if="params.owner_identity_z">
                                        <imageViewer :imgUrl="params.owner_identity_z"></imageViewer>
                                        <div class="del_img" @click="delImgFn('owner_identity_z')">
                                            <i class="iconfont ranqi_iconshanchu2"></i>
                                            删除
                                        </div>
                                    </div>
                                    <div class="upload_box ml5 " v-else>
                                        <UploadFile @success="uploadFile('owner_identity_z',$event)">
                                            <div class="upload_slot">
                                                <div class="upload-card"> <p>点击上传</p></div>
                                                <div class="upload_text">上传身份证正面</div>
                                            </div>
                                        </UploadFile>
                                    </div>
                                
                                </div>
                            </td>
                            <td class="h_row_item_value " style="padding:10px;">
                                <div class="flex2">
                                    <div class="preview_img" v-if="params.owner_identity_f">
                                        <imageViewer :imgUrl="params.owner_identity_f"></imageViewer>
                                        <div class="del_img" @click="delImgFn('owner_identity_f')">
                                            <i class="iconfont ranqi_iconshanchu2"></i>
                                            删除
                                        </div>
                                    </div>
                                    <div class="upload_box ml5" v-else>
                                        <UploadFile @success="uploadFile('owner_identity_f',$event)">
                                            <div class="upload_slot">
                                                <div class="upload-card"> <p>点击上传</p></div>
                                                <div class="upload_text">上传身份证反面</div>
                                            </div>
                                        </UploadFile>
                                    </div>
                                
                                </div>
                            </td>
                        </tr>
                    </table>
                 </div>
            </div>
            <div class="handle_table_data_content no_top_border">
                <table class="tablelist h_100 ">
                    <tr class="h_100">
                        <td class="h_row_item_label necessary h_100"> 证件地址 </td>
                        <td class="h_row_item_value">
                            <div class="h_row_item_value_box"> <el-input v-model="params.owner_identity_address" placeholder="输入证件地址"></el-input> </div>
                        </td>
                    </tr>
                </table>
            </div>

            <!-- 房产权属证明资料 -->
            <div class="handle_table_data_title mt20"> 房产权属证明资料 </div>
            <div class="flex">
                <div class="handle_table_data_content w_50">
                    <table class="tablelist">
                        <tr>
                            <td class="h_row_item_label necessary"> 证件类型 </td>
                            <td class="h_row_item_value">
                                <div class="h_row_item_value_box"> 
                                    <el-select v-model="params.proof_property_type" placeholder="请选择证件类型">
                                        <el-option v-for="item in proof_property_list" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                    </el-select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="h_row_item_label necessary"> 权利人 </td>
                            <td class="h_row_item_value">
                                <div class="h_row_item_value_box"> <el-input v-model="params.proof_property_rightHolder" placeholder="输入权利人姓名"></el-input> </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="h_row_item_label necessary"> 身份证 </td>
                            <td class="h_row_item_value">
                                <div class="h_row_item_value_box"> <el-input type="number" v-model="params.proof_property_identity_num" placeholder="输入身份证号"></el-input> </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="h_row_item_label necessary"> 合同编号 </td>
                            <td class="h_row_item_value">
                                <div class="h_row_item_value_box"> <el-input v-model="params.proof_property_contract_num" placeholder="输入合同编号"></el-input> </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="handle_table_data_content w_50 no_l_border">
                    <table class="tablelist h_100 ">
                        <tr class="h_100">
                            <td class="h_row_item_label necessary h_100"> 上传 </td>
                            <td class="h_row_item_value " style="padding:10px;">
                                <div class="flex2">
                                    <div class="preview_img" v-if="params.proof_property_deed_url">
                                        <imageViewer :imgUrl="params.proof_property_deed_url"></imageViewer>
                                        <div class="del_img" @click="delImgFn('proof_property_deed_url')">
                                            <i class="iconfont ranqi_iconshanchu2"></i>
                                            删除
                                        </div>
                                    </div>
                                    <div class="upload_box ml5 " v-else>
                                        <UploadFile @success="uploadFile('proof_property_deed_url',$event)">
                                            <div class="upload_slot">
                                                <div class="upload-card"> <p>点击上传</p></div>
                                                <div class="upload_text">房产证图片</div>
                                            </div>
                                        </UploadFile>
                                    </div>
                                
                                </div>
                            </td>
                            <td class="h_row_item_value " style="padding:10px;">
                                <div class="flex2">
                                    <div class="preview_img" v-if="params.proof_property_receipt_url">
                                        <imageViewer :imgUrl="params.proof_property_receipt_url"></imageViewer>
                                        <div class="del_img" @click="delImgFn('proof_property_receipt_url')">
                                            <i class="iconfont ranqi_iconshanchu2"></i>
                                            删除
                                        </div>
                                    </div>
                                    <div class="upload_box ml5" v-else>
                                        <UploadFile @success="uploadFile('proof_property_receipt_url',$event)">
                                            <div class="upload_slot">
                                                <div class="upload-card"> <p>点击上传</p></div>
                                                <div class="upload_text">初装费收据</div>
                                            </div>
                                        </UploadFile>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                 </div>
            </div>
            <div class="handle_table_data_content  no_top_border">
                <table class="tablelist h_100 ">
                    <tr class="h_100">
                        <td class="h_row_item_label necessary_top h_100"> 合同备案登记号码 </td>
                        <td class="h_row_item_value">
                            <div class="h_row_item_value_box"> <el-input type="number" v-model="params.proof_property_prove_num" placeholder="输入合同备案登记号码"></el-input> </div>
                        </td>
                        <td class="h_row_item_label necessary_top h_100"> 合同备案登记买受人 </td>
                        <td class="h_row_item_value">
                            <div class="h_row_item_value_box"> <el-input  v-model="params.proof_property_prove_user" placeholder="输入合同备案登记买受人"></el-input> </div>
                        </td>
                    </tr>
                </table>
            </div>
            <!-- 合同 -->
            <div class="handle_table_data_title mt20"> 合同 </div>
            <div class="handle_table_data_content">
                <table class="tablelist h_100 ">
                    <tr class="h_100">
                        <td class="h_row_item_label necessary h_100"> 上传 </td>
                        <td class="h_row_item_value " style="padding:10px;">
                            <div class="flex2">
                                <div class="preview_img ml5" v-for="(item,index) in params.contract_img_list" :key="index">
                                    <imageViewer :imgUrl="item"></imageViewer>
                                    <div class="del_img" @click="delImgFn('contract_img_list',index,true)">
                                        <i class="iconfont ranqi_iconshanchu2"></i>
                                        删除
                                    </div>
                                </div>
                                <div class="upload_box ml5 ">
                                    <UploadFile @success="uploadFile('contract_img_list',$event,true)">
                                        <div class="upload_slot">
                                            <div class="upload-card"> <p>点击上传</p></div>
                                            <div class="upload_text">房产证图片</div>
                                        </div>
                                    </UploadFile>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <!-- 备注 -->
            <div class="handle_table_data_title mt20"> 备注 </div>
            <div class="handle_table_data_content">
                <table class="tablelist h_100 ">
                    <tr class="h_100">
                        <td class="h_row_item_label necessary h_100"> 备注 </td>
                        <td class="h_row_item_value">
                            <div class="h_row_item_value_box"> <el-input  v-model="params.remarks" placeholder="备注"></el-input> </div>
                        </td>
                    </tr>
                </table>
            </div>

        </div>
        
    </div>  
</template>

<script>
import { account_type_list ,install_type_list,certificate_tyoe_list,proof_property_list} from './config'
export default {
    props:{
        isData:{
            type:Object,
            default:() => {}
        }
    },
    computed:{
        getOperating(){
            return this.isData.type === 0 ? '编辑' : '新增'
        }
    },
    data(){
        return {
            value:null,
            account_type_list:account_type_list, //开户类型列表
            install_type_list:install_type_list, //安装类型列表
            certificate_tyoe_list:certificate_tyoe_list, //业主证件类型
            proof_property_list:proof_property_list, //产权证明列表
            params:{
                //开户基本信息
                user_name:null , //用户姓名
                phone:null, //手机号
                account_type:null, //开户类型
                address:null,//业主地址
                install_type:null, //安装类型
                reservation_date:null, //预约日期
                //代理人资料
                proxy_user_name:null, //代理人姓名
                proxy_phone:null,//代理人电话
                proxy_identity_z:null, //代理人身份证正面
                proxy_identity_f:null, //代理人身份证反面
                proxy_entrust_url:null, //委托书
                proxy_entrust_hold_url:null , //手持委托书
                //业主证明身份资料
                certificate_tyoe:null, //证件类型
                owner_identity_num:null, //身份证号
                owner_user_name:null, //业主姓名
                owner_identity_date:null, //身份证有效日期
                owner_identity_z:null, //业主身份证正面
                owner_identity_f:null, //业主身份证反面
                owner_identity_address:null, //证件地址
                //房产权属证明资料
                proof_property_type:null, //证件类型
                proof_property_rightHolder:null, //权利人
                proof_property_identity_num:null , //身份证
                proof_property_contract_num:null , //合同编号
                proof_property_deed_url:null, //房产证
                proof_property_receipt_url:null, //收据
                proof_property_prove_num:null, //合同备案登记号码
                proof_property_prove_user:null, //合同备案登记买受人
                //合同
                contract_img_list:[], //合同图片列表
                //备注
                remarks:null

            }
        }
    },
    methods:{
        uploadFile(key,url,isArr){
            !isArr && (this.params[key] = url);
            isArr && (this.params[key].push(url));
        },
        delImgFn(key,index,isArr){
            !isArr && (this.params[key] = null);
            isArr && this.params[key].splice(index,1);
        }
    }
}
</script>

