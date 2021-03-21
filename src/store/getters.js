
const getters = {
    menuItems: state => state.menuItems.menuItems, //菜单栏数据
    message: state => state.menuItems.message, //菜单栏数据
    userInfo: state => state.user.userInfo , //用户信息
    moduleList: state => state.user.moduleList , //用户系统权限模块
    loginSwitch: state =>  state.menuItems.loginSwitch,
    localSwitch: state =>  state.menuItems.localSwitch,
    // companyByLineList: state =>  state.user.companyByLineList, //用户所属线
    like: state => state.user.like,     //  用户个人喜好
}
export default getters