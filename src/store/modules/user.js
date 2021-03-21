export default {
    namespaced: true,
    state: {
        moduleList:[] , //模块权限列表
        userInfo:null, //用户信息
        like:{
            isLock:false,
            pageSize:10
        }                         //用户个人喜好
    },
    mutations: {
        setModuleList(state,data){
            state.moduleList = data
        },
        setUserInfo(state,data){
            state.userInfo = data
        },
        setLike(state,data){
            state.like = data
        },
        setLock(state,data){
            state.like.isLock = data
        }
    },
  }