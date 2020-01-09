import { host } from '@/config';
import axios from 'axios';
import router from '../router/index'

const service = axios.create({   //配置
    baseURL: host,
    timeout: 6e4,
    validateStatus: x => x === 200
})

const done = function(h){
    return this.then(h).catch(({ code, msg }) => {
        console.error('请求错误啦 =>', code, msg)
    })
}

const onsend = o => { 
    if (typeof o.data === 'string'){
        o.headers[o.method]['Content-Type'] = 'application/json'
    }
    
    else if (Array.isArray(o.data)){
        const form = new FormData()
        Object.entries(o.data[0]).forEach(([ k, v ]) => {
            if (Array.isArray(v)){
                v.forEach(x => form.append(k, x))
            }
            else {
                form.append(k, v)
            }
        })
        o.data = form
    }
    // else {
    //     o.data = o.data;
    // }
    // o.headers['Authorization'] = '1213279901969350657'
    // o.headers['Authorization'] = localStorage.getItem("token")
    return o
}

const onsuccess = o => {
    //console.log('请求结果 =>', o.data)
    if (o.status !== 200){
        throw o.status
    }
    if(o.data.code === 10001){
        router.push({
            path:'/'
        })
    }
    // 此处数据有后台api数据格式决定
    // const { success, message, data ,code } = o.data
    return o.data;
}

const onerror = e => {
    const info = e.toString()
    const err = {
        Code: -1,
        Message: '请求失败'
    }

    if (info.includes('Network Error')){
        err.Message = '网络错误'
    }
    else if (info.includes('timeout of')){
        err.Message = '请求超时'
    }

    //console.log('error =>', e)
    throw err
}

Promise.prototype.done = done
window.Promise.prototype.done = done
service.interceptors.request.use(onsend)
service.interceptors.response.use(onsuccess, onerror)

export default {
    $get: (url, params) => service.get(url, { params }),
    $pop: (url, params) => service.delete(url, { params }),
    $put: (url, o) => service.put(url, o),
    $post: (url, o) => service.post(url, o),
    $patch: (url, o) => service.patch(url, o),
    $form: (url, o) => service.post(url, [o]),
    $auth: url => service.get(url, { responseType: 'blob' }).then(o => ({
        key: o.headers.key,
        data: o.data
    }))
}
