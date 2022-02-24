import axios from 'axios';
import { getToken } from '@/utils/auth.util.js';
import { ElMessage } from 'element-plus';

axios.defaults.timeout = 15000;

axios.interceptors.request.use(
  config => {
    config.headers.Authorization = getToken();
    // config.headers.locale = 'zh-CN';
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  config => config,
  error => {
    // 请求超时响应
    if (error.message.includes('timeout')) {
      ElMessage({
        message: '请求超时，请重试',
        type: 'error',
        center: true,
      });
      return;
    }
  }
);
class Http {
  getSysUrl(SYS, url) {
    return SYS + url;
  }
    /**
   * 将参数的null转变为空字符串
   * @param {JSON} params
   */
  handleParams(params) {
    if (!(params instanceof Object)) {
      if (params || params !== null) {
        return params;
      }
      return '';
    }
    let tempParams;
    if (params instanceof Array) {
      tempParams = [...params];
    } else {
      tempParams = { ...params };
    }
    for (const key in params) {
      tempParams[key] = this.handleParams(params[key]);
    }
    return tempParams;
  }

  async fetch(url, config) {
    try {
      return await axios.get(url, config);
    } catch (err) {
      console.error(err);
      throw (err);
    }
  }
  async postJson(url, data, config) {
    try {
      return await axios.post(url, this.handleParams(data), config);
    } catch (err) {
      console.error(err);
      throw (err);
    }
  }
}
export default new Http();
