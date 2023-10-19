import Service from './config.js'


const get = (config) => {
    return Service({
        ...config,
        method: 'get',
        params: config.data,
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    })
}

const post = (config) => {
    return Service({
        ...config,
        method: 'post',
        data: config.data,
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    })
}
const post2 = (config) => {
    return Service({
        ...config,
        method: 'post',
        data: config.data,
        headers: {
            "Content-Type": "multipart/form-data"
        },
    })
}


export default {
    get,
    post,
    post2,
}