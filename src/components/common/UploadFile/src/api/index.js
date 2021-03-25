import ajax from '@/utils/ajax'
//上传文件
export const uploadFiles = (url,params,fn) => ajax.$uploadPost( url, params,fn)
