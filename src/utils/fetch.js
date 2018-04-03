import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from './token'

const service = axios.create({
    baseURL: `http://${location.host}/api`,
    timeout: 20000
})

service.interceptors.request.use(config => {
    config.headers['x-access-token'] = getToken()
    return config
}, err => {
    console.log('axios request error ', config)
    return Promise.reject(err)
})

service.interceptors.response.use(req => {
    return req.data
}, err => {
    let message = err.response.data.message
    Message({
        type: 'error',
        message: message,
        duration: 3 * 1000
    })
    return Promise.reject(err)
})

const fetch = service

fetch.get = (url, params) => {
    return service({
        method: 'get',
        url: url,
        params: params
    })
}

fetch.post = (url, params) => {
    return service({
        method: 'post',
        url: url,
        data: params
    })
}

fetch.put = (url, params) => {
    return service({
        method: 'put',
        url: url,
        data: params
    })
}

fetch.delete = (url, params) => {
    return service({
        method: 'delete',
        url: url,
        data: params
    })
}

export default fetch