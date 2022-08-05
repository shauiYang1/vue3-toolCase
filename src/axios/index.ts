import axios from 'axios';
import { ElMessage } from 'element-plus'
import { get } from 'lodash';


export const API_ATTR = '/api';

const service = axios.create({
    baseURL: '', // url = base url + request url
    timeout: 5000,
    responseType: 'json',
    withCredentials: true,
    headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        'Content-Type': 'application/json;charset=utf-8'
    }
});

service.interceptors.request.use(
    config => {
        if (config.method === 'post') {
            config.data = JSON.stringify(config.data);
        }
        config.headers.terminal = 'pc'
        config.headers.token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjoxMDAwOCxcInVzZXJOYW1lXCI6XCLpmbbpu47mmI4xXCIsXCJ1c2VyQWNjb3VudFwiOlwidGxtMVwifSIsImNyZWF0ZWQiOjE2NTQ2NzQwMzkzNDYsImV4cCI6MTY1NzI2NjAzOX0.xx0rPWkJUW6H4jual3YWtc2arkm72NsgbzXE3jfV8lwHmZaqWV-ek7ADatIDv9nTPN8AAk_s6IOOWn2IZOTW_g'

        return config;
    },
    error => {
        ElMessage({
            type: 'error',
            message: error,
            showClose: true
        });
        console.error(error);
        return Promise.reject(error);
    }
);

// 响应状态的处理
service.interceptors.response.use(
    res => {
        return res?.data;
    },
    error => {
        const message = get(error, 'response.msg') || get(error, 'message');
        if (message) ElMessage({ type: 'error', message });
        return Promise.reject(message);
    }
);
export async function request({
    method,
    url,
    data = {}
}: {
    method: string;
    url: string;
    data?: any;
}): Promise<any> {
    const reqMethod: string = method.toLocaleLowerCase();
    const fullUrl = `${API_ATTR}${url}`;
    if (reqMethod === 'get') {

        let params = data;
        const keys = Object.keys(params);
        // 兼容传入参数{params:{}}
        if (
            keys.length === 1 &&
            keys[0] === 'params' &&
            typeof params['params'] === 'object'
        ) {
            params = data.params;
        }
        return await service.get(fullUrl, { params });
    } else if (reqMethod === 'post') {
        return await service.post(fullUrl, reqMethod);
    } else if (reqMethod === 'put') {
        return await service.put(fullUrl, data);
    } else if (reqMethod === 'delete') {
        return await service.delete(fullUrl, data);
    }
    return null;
}

export default {
    get: (url: string, data: any) => request({ method: 'get', url, data }),
    post: (url: string, data: any) => request({ method: 'post', url, data }),
    put: (url: string, data: any) => request({ method: 'put', url, data }),
    delete: (url: string, data: any) => request({ method: 'delete', url, data })
};
