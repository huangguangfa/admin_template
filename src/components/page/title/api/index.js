import ajax from '@/utils/ajax'

//查询
export const getPageDataAPI = params => ajax[params.type]('/baobei/system/log/getPageList',params.data || {});
//新增/修改
export const dataStatusAPI = params => ajax[params.type]('/baobei/system/log/getPageList',params.data || {});
//单个删除
export const deleteItemAPI = params => ajax[params.type]('/baobei/system/log/getPageList',params.data || {});
//批量删除
export const deleteListAPI = params => ajax[params.type]('/baobei/system/log/getPageList',params.data || {});
//启用/禁用
export const statusUpdateAPI = params => ajax[params.type]('/baobei/system/log/getPageList',params.data || {});


