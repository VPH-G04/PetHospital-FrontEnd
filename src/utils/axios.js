import axios from 'axios';
import { notification } from 'ant-design-vue';
import Storage from '@/utils/storage';

// create an axios instance
const service = axios.create({
  baseURL: 'http://47.117.135.149:8888',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
});

let timer;

// 拦截请求
service.interceptors.request.use(
  config => {
    const { token } = Storage.getItem('userInfo') || {};
    if (token) {
      config.headers.common['Authorization'] = token;
    }
    return config;
  },
  error => {
    notification.error({ message: 'bed request' });
    Promise.reject(error);
  }
);

// 拦截响应
service.interceptors.response.use(
  response => {
    if (response.data.code !== 200) {
      notification.error({ message: response.data.message });
      return Promise.reject('请求错误');
    }

    // Any status code that lie within the range of 2xx cause this function to trigger
    return response?.data?.data || response.data;
  },
  err => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (err.response) {
        const { status, data } = err.response;
        switch (status) {
          case 401:
            notification.error({
              message: (data && data.message) || '登录信息过期或未授权，请重新登录！'
            });
            break;

          default:
            notification.error({ message: data.message || `连接错误 ${status}！` });
            break;
        }
      } else {
        notification.error({ message: err.message });
      }
    }, 200); // 200 毫秒内重复报错则只提示一次！

    return Promise.reject(err);
  }
);

export default service;
